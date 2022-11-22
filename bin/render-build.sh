#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
EDITOR="mate --wait" bin/rails credentials:edit
bundle exec rails webpacker:install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
cp config/webpacker.example.yml config/webpacker.yml
cp babel.config.example.js babel.config.js

