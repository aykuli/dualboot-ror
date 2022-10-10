FactoryBot.define do
  factory :task do
    name
    description
    author_id { 1 }
    assignee_id { 1 }
    state { :new_task }
    expired_at { rand(1..60).minutes.ago }

    trait :new_task do
      state { :new_task }
    end

    trait :in_development do
      state { :in_development }
    end

    trait :in_qa do
      state { :in_qa }
    end

    trait :in_code_review do
      state { :in_code_review }
    end

    trait :ready_for_release do
      state { :ready_for_release }
    end

    trait :released do
      state { :released }
    end

    trait :archived do
      state { :archived }
    end
  end
end
