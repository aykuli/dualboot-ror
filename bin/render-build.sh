#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
EDITOR="mate --wait" bin/rails credentials:edit

bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate db:seed
cp config/webpacker.example.yml config/webpacker.yml
cp babel.config.example.js babel.config.js

curl -Ls https://download.newrelic.com/install/newrelic-cli/scripts/install.sh | bash && sudo NEW_RELIC_API_KEY=$NRIA_LICENSE_KEY NEW_RELIC_ACCOUNT_ID=$NEW_RELIC_ACCOUNT_ID /usr/local/bin/newrelic install -n logs-integration
