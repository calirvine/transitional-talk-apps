class ApplicationController < ActionController::Base
    before_action :artificial_delay

    def artificial_delay
      sleep rand(0.5...1.5)
    end
end
