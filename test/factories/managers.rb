FactoryBot.define do
  factory :manager, parent: :user do
    type { 'Manager' }
  end
end
