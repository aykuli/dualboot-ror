class Web::PasswordResetsController < Web::ApplicationController
  before_action :get_user, only: [:edit, :update]

  def new; end

  def create
    @user = User.find_by_email(params[:password_reset][:email].downcase)

    if @user
      @user.create_reset_digest
      UserMailer.with({ user: @user }).password_reset.deliver_later

      flash.now[:info] = 'Email sent with password reset link.'
      redirect_to(root_url)
    else
      flash.now[:danger] = 'Email address not found.'
      render('new')
    end
  end

  def update
    valid = password_valid? && reset_digest_valid?

    if valid
      @user.update_attribute(:password, params[:password])
      @user.update_attribute(:reset_digest, nil)

      sign_in(@user)
      flash.now[:success] = 'Password has been reset.'
      redirect_to(root_url)
    else
      flash.now[:danger] = 'You cannot reset password. Please, try again.'
      render('new')
    end
  end

  private

  def user_params
    params.permit(:id, :email, :password, :password_confirmation)
  end

  def get_user
    @user = User.find_by_email(params[:email])
  end

  def password_valid?
    return if @user.password_reset_expired?
    return if params[:password].blank?
    return unless params[:password] == params[:password_confirmation]

    true
  end

  def reset_digest_valid?
    return if @user.reset_digest.nil?

    BCrypt::Password.new(@user.reset_digest).is_password?(params[:id])
  end
end
