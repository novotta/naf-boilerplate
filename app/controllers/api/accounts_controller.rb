# Create an AccountsController with an index to retrive accounts from the Narmi service.

class Api::AccountsController < ApplicationController

  def index
    accounts = Narmi.new(request.headers["Authorization"]).accounts
    render json: accounts
  end

  def favorite
    payload = {
      favorited: true
    }
    account = Narmi.new(request.headers["Authorization"]).update_account(params[:account_id], payload)
    render json: account
  end

  def unfavorite
    payload = {
      favorited: false
    }
    account = Narmi.new(request.headers["Authorization"]).update_account(params[:account_id], payload)
    render json: account
  end

  private

end