require 'test_helper'

class Web::PasswordResetsControllerTest < ActionController::TestCase
  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    user = create(:user)
    password_reset = { email: user.email }

    assert_emails 1 do
      post :create, params: { password_reset: password_reset, format: :json }
    end

    assert_response :redirect
  end

  test 'should not post create' do
    password_reset = { email: 'some_email@t.tu'}

    post :create, params: { password_reset: password_reset, format: :json }

    assert_response :redirect
  end

  test 'should update' do
    user = create(:user)

    password = 'password'
    password_confirmation='password'

    put :update, params: { email: user.email, password: password, password_confirmation: password_confirmation }



    assert_response :redirect
  end
end
