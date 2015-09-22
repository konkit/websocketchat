source 'https://rubygems.org'

ruby '2.2.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.0'
# Use sqlite3 as the database for Active Record
#gem 'sqlite3'
gem 'pg'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
gem 'unicorn'

gem 'omniauth-facebook'

# Use Capistrano for deployment
group :development do
  gem 'capistrano-rails'
  gem 'capistrano-rvm'
  gem 'capistrano3-unicorn'
end

gem 'websocket-rails'
gem 'bower-rails'
gem 'haml-rails'
gem 'angular-rails-templates'
gem 'angular_rails_csrf'

gem 'devise'

# For heroku
gem 'rails_12factor', group: :production

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'faker'
  gem 'launchy'
  gem 'guard-rspec'
  gem 'json_spec', git: 'https://github.com/rusterholz/json_spec.git'
  gem 'database_cleaner'
  gem 'shoulda-matchers'

  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'capybara-screenshot', :group => :test

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
