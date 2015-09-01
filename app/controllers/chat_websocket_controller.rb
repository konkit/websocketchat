class ChatWebsocketController < WebsocketRails::BaseController
  def initialize_session
    controller_store[:message_count] = 0
  end

  def add_message
    puts 'Message: ' + message.to_s
    puts 'user : ' + message[:user]
    chat_message = "[#{Time.now.strftime('%H:%M:%S')}] #{message[:user]} > #{message[:text]}"
    puts chat_message
    broadcast_message :chat_listener, chat_message
  end

end
