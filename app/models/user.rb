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

  attr_accessor :remember_token, :reset_token, :password_confirmation

  class << self
    def new_token
      SecureRandom.urlsafe_base64
    end

    def digest(token)
      BCrypt::Password.create(token, cost: BCrypt::Engine.cost)
    end
  end

  def email=(value)
    super(value.mb_chars.downcase)
  end

  def create_reset_digest
    self.reset_token = User.new_token
    byebug
    update_attribute(:reset_digest, User.digest(reset_token))
    update_attribute(:reset_sent_at, Time.now)
  end

  def password_reset_expired?
    reset_sent_at < 24.hours.ago
  end
end
