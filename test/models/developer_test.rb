require 'test_helper'

class DeveloperTest < ActiveSupport::TestCase
  test 'create developer' do
    developer = create(:developer)
    assert developer.persisted?
  end
end
