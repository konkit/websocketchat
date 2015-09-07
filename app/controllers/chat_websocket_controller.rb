class ChatWebsocketController < WebsocketRails::BaseController
  def initialize_session
    controller_store[:message_count] = 0
    controller_store[:users] = []
  end

  def add_message
    chat_message = "[#{Time.now.strftime('%H:%M:%S')}] #{message[:user]} > #{message[:text]}"
    broadcast_message :chat_listener, chat_message
  end

  def add_user
    controller_store[:users] << message[:username]
    connection_store[:current_user] = message[:username]
    broadcast_message(:users_list_listener, controller_store[:users])
  end

  def delete_user
    controller_store[:users].delete( connection_store[:current_user] )
    broadcast_message(:users_list_listener, controller_store[:users])
  end
end
