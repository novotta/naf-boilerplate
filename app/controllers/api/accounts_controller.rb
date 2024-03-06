# Create an AccountsController with an index to retrive accounts from the Narmi service.

class Api::AccountsController < ApplicationController

  def index
    accounts = Narmi.new(request.headers["Authorization"]).accounts
    render json: accounts
  end

  def update
    payload = {
      name: params[:account][:name],
      favorited: params[:account][:favorited],
      hidden: params[:account][:hidden]
    }
    account = Narmi.new(request.headers["Authorization"]).update_account(params[:id], payload)
    render json: account
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