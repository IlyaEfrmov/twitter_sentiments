require File.expand_path('../boot', __FILE__)

require "action_controller/railtie"
require "action_mailer/railtie"
require "sprockets/railtie"

Bundler.require(*Rails.groups)

module TwitterSentiments
  class Application < Rails::Application
    
    config.assets.paths << Rails.root.join('app', 'assets', 'fonts')
    config.assets.precompile += %w(dashboard.js)
    
    
    config.time_zone = "Europe/Moscow"
    
    config.i18n.default_locale = :ru
  end
end
