FactoryBot.define do
  factory :developer, parent: :user do
    type { 'Developer' }
  end
end
