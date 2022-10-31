class Api::V1::ApplicationController < Api::ApplicationController
  include AuthHelper

  def self.responders
    JsonResponder
  end
end
