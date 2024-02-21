class AuthenticationsController < ApplicationController

  def verify


    # get the secure code from the request
    puts "VERIFY"
    puts params.inspect
    secure_code = authentication_params[:code]
    # check if the secure code is valid
    puts "SECURE CODE"
    puts secure_code
  end

  # permit the secure code to be passed in the request
  def authentication_params
    params.permit(:code)
  end
end
