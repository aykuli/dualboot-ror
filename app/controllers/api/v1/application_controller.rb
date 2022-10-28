class Api::V1 < Api::ApplicationController
  def self.responders
    JsonResponder
  end
end