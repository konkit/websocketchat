class ChatWebsocketController < WebsocketRails::BaseController
  def initialize_session
    controller_store[:users] = []
  end

  def add_message
    send_simple_message
  end

  def add_user
    controller_store[:users] << message[:user]
    connection_store[:current_user] = message[:user]
    broadcast_message(:users_list_listener, controller_store[:users])
    send_user_joined_message
  end

  def delete_user
    controller_store[:users].delete( connection_store[:current_user] )
    broadcast_message(:users_list_listener, controller_store[:users])
    send_user_left_message
  end

  private
  def send_simple_message
    chat_message = {
      type: :message,
      text: "[#{Time.now.strftime('%H:%M:%S')}] <#{message[:user]}> #{message[:text]}"
    }
    broadcast_message :chat_listener, chat_message
  end

  def send_user_joined_message
    sent_message = {
      type: :info,
      text: "[#{Time.now.strftime('%H:%M:%S')}] User #{connection_store[:current_user].username} joined"
    }
    broadcast_message(:chat_listener, sent_message)
  end

  def send_user_left_message
    sent_message = {
      type: :info,
      text: "[#{Time.now.strftime('%H:%M:%S')}] User #{connection_store[:current_user].username} left"
    }
    broadcast_message(:chat_listener, sent_message)
  end
end
