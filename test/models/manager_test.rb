require 'test_helper'

class ManagerTest < ActiveSupport::TestCase
  test 'create manager' do
    manager = create(:manager)
    assert manager.persisted?
  end
end
