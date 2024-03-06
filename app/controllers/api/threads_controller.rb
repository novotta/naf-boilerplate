class Api::ThreadsController < ApplicationController

  def index
    threads = Narmi.new(request.headers["Authorization"]).threads_with_messages
    render json: threads
  end

  def create_message
    puts "CREATE MESSAGE"
    puts params
    payload = {
      body: params[:message],
      internal_note: false
    }
    new_message = Narmi.new(request.headers["Authorization"]).create_message(params[:id], payload)
    render json: new_message
  end

  private

end