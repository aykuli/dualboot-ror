class Web::PasswordResetsController < Web::ApplicationController
  before_action :get_user,          only: [:edit, :update]

  def new; end

  def create
    @user = User.find_by_email(params[:password_reset][:email].downcase)

    if @user
      @user.create_reset_digest
      UserMailer.with({ user: @user }).password_reset.deliver_now

      flash.now[:info] = 'Email sent with password reset link.'
      redirect_to(root_url)
    else
      flash.now[:danger] = 'Email address not found.'
      render('new')
    end
  end

  def update
    check_password
    byebug
    if @user.update_attribute(:password, params[:password])
      sign_in(@user)
      flash.now[:success] = 'Password has been reset.'
      redirect_to root_url
    else
      flash.now[:danger] = 'Something went wrong. Please, try again.'
      render('edit')
    end
  end

  private


  def user_params
    params.permit(:id, :email, :password, :password_confirmation)
  end

  def password_blank?
    params[:password].blank?
  end

  def get_user
    @user = User.find_by_email(params[:email])
  end

  def check_expiration
    if @user.password_reset_expired?
      flash.now[:danger] = 'Password reset was expired.'
      render 'new'
    end
  end

  def password_invalid?
    byebug
    return true if params[:password].blank?
    return true unless params[:password] == params[:password_confirmation]

    false
  end

  def check_password
    byebug
    message = 'Password reset was expired.' if @user.password_reset_expired?
    message = 'Password and confirmations should be the same.' if password_invalid?

    if @user.password_reset_expired? || password_invalid?
      byebug
      flash[:danger] = message
      render 'new'
    end
  end
end
