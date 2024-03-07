# ================================================
# CONTROLLERS->THREADS ===========================
# ================================================
class Api::ThreadsController < ApplicationController

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # INDEX ----------------------------------------
  # ----------------------------------------------
  def index
    threads = Narmi.new(request.headers["Authorization"]).threads_with_messages
    render json: threads
  end

  # ----------------------------------------------
  # CREATE ---------------------------------------
  # ----------------------------------------------
  def create
    payload = {
      subject: params[:thread][:subject],
      body: params[:thread][:body],
    }
    new_thread = Narmi.new(request.headers["Authorization"]).create_thread(payload)
    render json: new_thread
  end

  # ----------------------------------------------
  # CREATE-MESSAGE -------------------------------
  # ----------------------------------------------
  def create_message
    payload = {
      body: params[:message],
      internal_note: false
    }
    new_message = Narmi.new(request.headers["Authorization"]).create_message(params[:id], payload)
    render json: new_message
  end

end