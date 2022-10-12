require 'test_helper'

class Web::SessionsControllerTest < ActionController::TestCase
  test 'should get new' do
    get :new
    assert_response :success
  end

  test 'should post create' do
    password = generate(:string)
    puts "string #{:string}"
    user = create(:user, { password: password })
    attributes = { email: user.email, password: password }
    post :create, params: { session_form: attributes }
    assert_response :redirect
  end

  test 'should delete' do
    delete :destroy
    assert_reponse :redirect
  end
end
