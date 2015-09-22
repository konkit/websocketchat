require 'rails_helper'

RSpec.describe HomeController, type: :controller do
  describe "GET index" do
    it "sets fbconfig variable with FB data from config" do
      get :index
      expect(assigns(:fbconfig)).to include('appid')
    end
  end

  describe "GET get_current_user" do
    it "returns current user as @user" do
      get :get_current_user, { :format => :json }
      expect(assigns(:user)).to eq(controller.current_user)
    end
  end
end
