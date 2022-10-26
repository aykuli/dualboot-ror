class TaskSerializer < ApplicationSerializer
  attributes :id, :name, :description, :state, :expired_at, :transitions

  belongs_to :author
  belongs_to :assignee

  def transitions
    object.state_transitions.amp do |transition|
      # transition
      {
        event: transition.event,
        from: transition.from,
        to: transition.to
      }
    end
  end
end
