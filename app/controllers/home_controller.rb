class HomeController < ApplicationController
  def index
  end

  def get_current_user
    @user = current_user
  end
end
