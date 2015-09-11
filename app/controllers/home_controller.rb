class HomeController < ApplicationController
  def index
    @fbconfig = Rails.application.config_for(:facebook)
  end

  def get_current_user
    @user = current_user
  end
end
