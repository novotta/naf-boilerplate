require 'base64'
require 'http'
require 'openssl'

class AuthenticationController < ApplicationController

  # Action method to handle the POST request
  def verify
    # Extract the signed_request parameter from the POST request
    signed_request = authentication_params[:signed_request]
    test_parts = signed_request.split('.')


    # Combine the first two parts to recreate the signed message
    signed_message = "#{test_parts[0]}.#{test_parts[1]}"

    # Calculate HMAC using OpenSSL
    hmac = OpenSSL::HMAC.digest('sha256', Rails.application.credentials.dig(:narmi, :secret), signed_message)
    calculated_hmac = Base64.urlsafe_encode64(hmac).delete("=")


    # Compare the calculated HMAC with the provided HMAC
    if calculated_hmac != test_parts[2]

      puts "failed to validate signed jwt"
      return
    end

    # Decode the payload from base64 and parse it as JSON
    payload = JSON.parse(Base64.decode64(test_parts[1]))
    client_id = payload["aud"]

    puts "CLIENT ID"
    puts client_id

    token = exchange_token(authentication_params[:code], client_id)

    puts "TOKEN"
    puts token.inspect

    redirect_to "/?#{token.to_query}"
  end

  private

  def exchange_token(code, client_id)
    payload = {
      "grant_type": "authorization_code",
      "code": code,
      "scope": "read write read:profile write:preferences",
      "client_id": client_id,
      "client_secret": Rails.application.credentials.dig(:narmi, :secret)
    }

    response = HTTP.headers("Content-Type" => "application/json").post("https://api.sandbox.narmi.dev/v1/tokens", json: payload).parse
  end

  # permit the secure code to be passed in the request
  def authentication_params
    params.permit(:code, :signed_request)
  end
end
