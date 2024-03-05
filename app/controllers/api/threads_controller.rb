class Api::ThreadsController < ApplicationController

  def index
    threads = Narmi.new(request.headers["Authorization"]).threads
    render json: threads
  end

  private

end