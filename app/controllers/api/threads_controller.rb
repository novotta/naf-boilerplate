class Api::ThreadsController < ApplicationController

  def index
    threads = Narmi.new(request.headers["Authorization"]).threads_with_messages
    render json: threads
  end

  private

end