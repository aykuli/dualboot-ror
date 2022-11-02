# frozen_string_literal: true

require 'js-routes'

namespace :js_routes do
  desc "Generate js routes for webpack"
  task generate: :environment do
    puts '-------------'

    ROUTES_DIR = File.join('app', 'javascript', 'routes')
    FileUtils.mkdir_p(Rails.root.join(ROUTES_DIR))
    puts '-------------'
    file_name = File.join(ROUTES_DIR, 'ApiRoutes.js')
    puts "JsRoutes #{JsRoutes.class}"
    puts "File.exists?(file_name) #{File.exists?(file_name)}"
    # File.new(file_name, "w+") unless File.exists?(file_name)

    JsRoutes.generate!(file_name, camel_case: true)
  end
end
