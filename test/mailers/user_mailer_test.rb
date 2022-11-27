require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "task created" do
    user = create(:user)
    task = create(:task)
    params = { user: user, task: task }
    email = UserMailer.with(params).task_created

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'New task created', email.subject
    assert email.body.to_s.include?("Task &#39;#{task.name}&#39; was created")
  end

  test "task updated" do
    user = create(:user)
    task = create(:task)
    params = { user: user, task: task }
    email = UserMailer.with(params).task_updated

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'Task was updated', email.subject
    assert email.body.to_s.include?("Task &#39;#{task.name}&#39; was updated")
  end

  test "task destroyed" do
    user = create(:user)
    task = create(:task)
    params = { user: user, task: task }
    email = UserMailer.with(params).task_destroyed

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal [user.email], email.to
    assert_equal 'Task was destroyed', email.subject
    assert email.body.to_s.include?("Task &#39;#{task.name}&#39; was destroyed")
  end

  test 'password reset' do
    user = create(:user)
    user.reset_token = User.new_token
    params = { user: user }

    email = UserMailer.with(params).password_reset

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal ['noreply@taskmanager.com'], email.from
    assert_equal "Password reset", email.subject
    assert_equal [user.email], eail.to
    assert_match user.reset_token, email.body.encoded
  end
end
