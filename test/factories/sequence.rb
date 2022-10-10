FactoryBot.define do
  sequence :string, aliases: [:first_name, :last_name, :password] do |n|
    "string #{n}"
  end

  sequence :email do |n|
    "person#{n}@example.com"
  end

  sequence :avatar do |_n|
    'https://via.placeholder.com/100'
  end

  sequence :task, aliases: [:name, :description] do |n|
    "task string #{n}"
  end
end
