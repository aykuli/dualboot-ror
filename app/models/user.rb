class User < ApplicationRecord
  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assignee_tasks, class_name: 'Task', foreign_key: :assignee_id

  EMAIL_REGEXP = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d-]+)*\.[a-z]+\z/i
  before_save { email.downcase! }

  has_secure_password

  validates :first_name, :last_name, presence: true, length: { maximum: 50, minimum: 2 }
  validates :email,
            presence: true,
            length: { maximum: 255, minimum: 6 },
            format: { with: EMAIL_REGEXP },
            uniqueness: { case_sensitive: false }
end
