class Web::PasswordResetsController < Web::ApplicationController
  before_action :get_user, onlu: [:edit, :update]
  before_action :valid_user, onlu: [:edit, :update]

  def new; end

  def create
    @user = User.find_by_email(params[:password_reset][:email].downcase)

    if @user
      @user.create_reset_digest
      UserMailer.with({ user: @user }).password_reset.deliver_now

      flash[:info] = 'Email sent with password reset link.'
      redirect_to(root_url)
    else
      flash[:danger] = 'Email address not found.'
      render('new')
    end
  end

  def update
    if password_blank?
      flash[:danger] = 'Password cannot be blank.'
      render('edit')
    elsif @user.update_attributes(user_params)
      log_in(@user)
      flash[:success] = 'Password has been reset.'
      redirect_to(@user)
    else
      render('edit')
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :password_confirmation)
  end

  def password_blank?
    params[:user][:password].blank?
  end

  def get_user
    @user = User.find_by_email(params[:email])
  end

  def check_expiration
    if @user.password_reset_expired?
      flash[:danger] = 'Password reset was expired.'
      redirect_to(new_password_resets_url)
    end
  end
end
