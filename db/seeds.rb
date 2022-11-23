admin = Admin.find_or_create_by(first_name: 'Aynur', last_name: 'Shauerman', email: 'admin@localhost')
admin.password = '123456789'
admin.save

60.times do |i|
  u = [Manager, Developer].sample.new
  u.email = "email#{i}@example.com"
  u.first_name = "Firstname#{i}"
  u.last_name = "Lastname#{i}"
  u.password = i.to_s
  u.save
end

manager = Manager.first
developer = Developer.first
developer_second = Developer.second

10.times do |i|
  task = manager.my_tasks.new(
    name: "Task #{i} for developer 1",
    description: "Task description #{i} for developer 1",
    assignee_id: developer.id,
  )
  task.save
end

5.times do |i|
  task = manager.my_tasks.new(
    name: "Task 1 #{i} for developer 2",
    description: "Task description 1 #{i} for developer 2",
    assignee: developer_second,
  )
  task.save
end



