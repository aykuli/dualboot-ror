class JsonResponder < ActionController::Responder
  def api_behaviour(*args, &block)
    if post?
      display(resourse, status: :created)
    elsif put? || patch?
      display(resourse, status: :ok)
    else
      super
    end
  end
end