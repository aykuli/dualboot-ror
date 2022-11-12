class Task < ApplicationRecord
  belongs_to :author, class_name: 'User'
  belongs_to :assignee, class_name: 'User', optional: true

  validates :name, :description, :author, presence: true, length: { minimum: 5 }
  validates :description, length: { maximum: 500 }

  state_machine :state, initial: :new_task do
    event :archive do
      transition [:new_task, :released] => :archived
    end

    event :start_development do
      transition [:new_task, :in_qa, :in_code_review] => :in_development
    end

    event :end_development do
      transition in_development: :in_qa
    end

    event :start_code_review do
      transition in_qa: :in_code_review
    end

    event :prepare_for_release do
      transition in_code_review: :ready_for_release
    end

    event :release do
      transition ready_for_release: :released
    end
  end
end
