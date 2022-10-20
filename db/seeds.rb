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
