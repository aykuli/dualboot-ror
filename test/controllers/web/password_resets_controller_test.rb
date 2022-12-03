require 'test_helper'

class Web::PasswordResetsControllerTest < ActionController::TestCase
  setup do
    ActionMailer::Base.deliveries.clear
    @user = create(:user)
  end

  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    params = { email: @user.email }

    assert_emails 1 do
      post :create, params: { password_reset: params, format: :json }
    end

    assert_response :redirect
  end

  test 'should update' do
    @user.reset_token = User.new_token
    @user.update_attribute(:reset_digest, User.digest(@user.reset_token))
    @user.update_attribute(:reset_sent_at, Time.now)

    password = 'password'
    password_confirmation = 'password'

    put :update, params: { id: @user.reset_token, email: @user.email, password: password, password_confirmation: password_confirmation }

    assert_response :redirect
  end
end
