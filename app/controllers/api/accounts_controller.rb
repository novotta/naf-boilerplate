# Create an AccountsController with an index to retrive accounts from the Narmi service.

class Api::AccountsController < ApplicationController

  def index
    accounts = Narmi.new(params[:code]).accounts
    render json: accounts
  end

end