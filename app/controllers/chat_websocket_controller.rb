class ChatWebsocketController < WebsocketRails::BaseController
  def initialize_session
    controller_store[:message_count] = 0
  end

  def add_message
    puts 'Triggered add_message ' + message
    send_message :chat_listener, message
  end

end
