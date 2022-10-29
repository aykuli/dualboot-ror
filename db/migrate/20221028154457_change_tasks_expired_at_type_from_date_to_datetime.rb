class ChangeTasksExpiredAtTypeFromDateToDatetime < ActiveRecord::Migration[6.1]
  def up
    change_table :tasks do |t|
      t.change :expired_at, :datetime
    end
  end

  def down
    change_table :tasks do |t|
      t.change :expired_at, :date
    end
  end
end
