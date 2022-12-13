class TestFailuresJob
  include Sidekiq::Worker

  def perform
    raise
  end
end