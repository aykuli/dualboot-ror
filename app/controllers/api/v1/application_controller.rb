class Api::V1::ApplicationController < Api::ApplicationController
  include AuthHelper

  respond_to :json

  def self.responders
    JsonResponder
  end
end
