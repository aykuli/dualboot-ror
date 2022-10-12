class User < ApplicationRecord
  has_many :my_tasks, class_name: 'Task', foreign_key: :author_id
  has_many :assignee_tasks, class_name: 'Task', foreign_key: :assignee_id

  before_save { email.downcase! }

  has_secure_password

  validates :first_name, :last_name, presence: true, length: { maximum: 50, minimum: 2 }
  validates :email,
            presence: true,
            length: { maximum: 255, minimum: 6 },
            format: { with: URI::MailTo::EMAIL_REGEXP },
            uniqueness: { case_sensitive: false }

  def email=(value)
    super(value.mb_chars.downcase)
  end
end
