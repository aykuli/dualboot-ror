manager = Manager.find_or_create_by(first_name: 'Margo', last_name: 'Marley', email: 'manager@localhost')
manager.password = '123456789'
manager.save

developer = Developer.find_or_create_by(first_name: 'David', last_name: 'Dove', email: 'david@localhost')
developer.password = '123456789'
developer.save

10.times do |i|
  task = manager.my_tasks.new(
      name: "Task #{i}",
      description: "Task description #{i}",
      assignee_id: developer.id,
  )
  task.save
end

developer_second = Developer.find_or_create_by(first_name: 'Danny', last_name: 'Doyl', email: 'danny@localhost')
developer_second.password = '123456789'
developer_second.save

5.times do |i|
  task = manager.my_tasks.new(
    name: "Task 1 #{i}",
    description: "Task description 1 #{i}",
    assignee: developer_second,
  )
  task.save
end
