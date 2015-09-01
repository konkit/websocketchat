class ChatWebsocketController < WebsocketRails::BaseController
  def initialize_session
    controller_store[:message_count] = 0
  end

  def add_message
    chat_message = "[#{Time.now.strftime('%H:%M:%S')}] #{message[:user]} > #{message[:text]}"
    broadcast_message :chat_listener, chat_message
  end

end
