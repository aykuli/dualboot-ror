require 'test_helper'

class Api::V1::TasksControllerTest < ActionController::TestCase
  test 'should get show' do
    author = create(:user)
    task = create(:task, author: author)
    get :show, params: { id: task.id, format: :json }
    assert_response :success
  end

  test 'should get index' do
    get :index, params: { format: :json }
    assert_response :success
  end

  test 'should post create' do
    author = create(:user)
    sign_in author

    assignee = create(:user)
    task_attributes = attributes_for(:task).merge({ assignee_id: assignee.id })
    assert_emails 1 do
      post :create, params: { task: task_attributes, format: :json }
    end
    assert_response :created

    data = JSON.parse(response.body)
    created_task = Task.find(data['task']['id'])
    assert created_task.present?

    assert_equal task_attributes[:state].to_s, created_task['state']
    assert_equal task_attributes[:expired_at].strftime('%d/%m/%Y, %k:%M'), created_task['expired_at'].strftime('%d/%m/%Y, %k:%M')

    comparable_task_keys = task_attributes.except(:expired_at).except(:state)
    assert_equal comparable_task_keys.stringify_keys, created_task.slice(*comparable_task_keys.keys)
  end

  test 'should put update' do
    author = create(:user)
    assignee = create(:user)
    task = create(:task, author: author)
    task_attributes = attributes_for(:task).merge({ author_id: author.id, assignee_id: assignee.id }).stringify_keys

    patch :update, params: { id: task.id, format: :json, task: task_attributes }
    assert_response :success

    task.reload

    assert_equal task_attributes['state'].to_s, task['state']

    comparable_task_keys = task_attributes.except('expired_at').except('state')
    assert_equal task.slice(*comparable_task_keys.keys), comparable_task_keys
  end

  test 'should delete task' do
    author = create(:user)
    task = create(:task, author: author)
    delete :destroy, params: { id: task.id, format: :json }
    assert_response :success

    assert_not Task.where(id: task.id).exists?
  end
end
