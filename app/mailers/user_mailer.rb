class UserMailer < ApplicationMailer
  default from: 'noreply@taskmanager.com'

  def task_created
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'New task created')
  end

  def task_updated
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'Task was updated')
  end

  def task_destroyed
    user = params[:user]
    @task = params[:task]

    mail(to: user.email, subject: 'Task was destroyed')
  end

  def password_reset
    user = params[:user]
    byebug
    mail(to: user.email, subject: "Password reset")
  end
end
