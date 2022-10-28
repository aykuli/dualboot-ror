class ChangeTasksExpiredAtTypeFromDateToDatetime < ActiveRecord::Migration[6.1]
  def down
    change_table :tasks do |t|
      t.change :expired_at, :date
    end
  end

  def up
    change_table :tasks do |t|
      t.change :expired_at, :datetime
    end
  end
end
