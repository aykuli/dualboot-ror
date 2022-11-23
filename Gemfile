source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 6.1.4', '>= 6.1.4.4'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'
# Use Puma as the app server
gem 'puma', '~> 5.0'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 5.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.7'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.4', require: false

gem 'simple_form'
gem 'state_machines'
gem 'state_machines-activerecord'

# https://github.com/slim-template/slim
# Slim engine to embed Ruby code directly in your HTML views
gem 'slim-rails'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'factory_bot_rails'
  gem 'rubocop'

  # https://github.com/simplecov-ruby/simplecov
  # Code coverage for Ruby
  gem 'simplecov'
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'web-console', '>= 4.1.0'
  # Display performance information such as SQL time and flame graphs for each request in your browser.
  # Can be configured to work on production as well see: https://github.com/MiniProfiler/rack-mini-profiler/blob/master/README.md
  gem 'rack-mini-profiler', '~> 2.0'
  gem 'listen', '~> 3.3'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'

  # https://github.com/lemurheavy/coveralls-ruby
  gem 'coveralls'

  # https://github.com/fortissimo1997/simplecov-lcov
  gem 'simplecov-lcov', '~> 0.7.0'

  # https://github.com/tagliala/coveralls-ruby-reborn
  gem 'coveralls_reborn', '~> 0.25.0'
end

# https://github.com/kaminari/kaminari
# Paginator
gem 'kaminari'

# https://github.com/activerecord-hackery/ransack
# https://www.rubydoc.info/github/ernie/ransack/Ransack
# Ransack will help you easily add searching to your Rails application, without any additional dependencies
gem 'ransack'

# https://github.com/heartcombo/responders
# A set of responders modules to dry up your Rails app
gem 'responders'

# https://github.com/rails-api/active_model_serializers
# The easiest way to create a new serializer is to generate a new resource, which will generate a serializer at the same time:
gem 'active_model_serializers'

# https://github.com/renchap/webpacker-react
gem 'webpacker-react'

# https://github.com/railsware/js-routes
# Generates javascript file that defines all Rails named routes as javascript helpers
gem 'js-routes'

# https://docs.rollbar.com/docs/rails
gem 'rollbar'