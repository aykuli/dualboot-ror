require 'test_helper'

class AdminTest < ActiveSupport::TestCase
  test 'create admin' do
    admin = create(:admin)
    assert admin.persisted?
  end
end
