# ================================================
# CONTROLLERS->ACCOUNTS ==========================
# ================================================
class Api::AccountsController < ApplicationController

  # ==============================================
  # ACTIONS ======================================
  # ==============================================

  # ----------------------------------------------
  # INDEX ----------------------------------------
  # ----------------------------------------------
  def index
    accounts = Narmi.new(request.headers["Authorization"]).accounts
    render json: accounts
  end

  # ----------------------------------------------
  # UPDATE ---------------------------------------
  # ----------------------------------------------
  def update
    payload = {
      name: params[:account][:name],
      favorited: params[:account][:favorited],
      hidden: params[:account][:hidden]
    }
    account = Narmi.new(request.headers["Authorization"]).update_account(params[:id], payload)
    render json: account
  end

  # ----------------------------------------------
  # FAVORITE -------------------------------------
  # ----------------------------------------------
  def favorite
    payload = {
      favorited: true
    }
    account = Narmi.new(request.headers["Authorization"]).update_account(params[:account_id], payload)
    render json: account
  end

  # ----------------------------------------------
  # UNFAVORITE -----------------------------------
  # ----------------------------------------------
  def unfavorite
    payload = {
      favorited: false
    }
    account = Narmi.new(request.headers["Authorization"]).update_account(params[:account_id], payload)
    render json: account
  end

end