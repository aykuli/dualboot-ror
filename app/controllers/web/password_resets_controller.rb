class Web::PasswordResetsController < Web::ApplicationController
  def new
  end

  def create
    @user = User.find_by_email(params[:password_reset][:email].downcase)

    if @user
      @user.create_reset_digest
      UserMailer.with({ user: @user, task: task }).password_reset.deliver_now

      redirect_to root_url
    else
      render 'new'
    end
  end

  def edit
  end
end
