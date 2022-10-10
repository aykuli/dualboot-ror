require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test 'create' do
    [:new_task,
     :in_development,
     :in_qa,
     :in_code_review,
     :ready_for_release,
     :released,
     :archived].each do |state|
      task = create(:task, state)
      assert task.persisted?
    end
  end
end
