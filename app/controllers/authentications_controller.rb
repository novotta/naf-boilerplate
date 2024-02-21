require 'base64'
require 'openssl'

class AuthenticationsController < ApplicationController

  # Action method to handle the POST request
  def verify
    # Extract the signed_request parameter from the POST request
    signed_request = authentication_params[:signed_request]
    puts "SIGNED REQUEST"
    puts signed_request

    # Decode the signed request from base64
    decoded_body = Base64.decode64(signed_request)
    puts "DECODED BODY"
    puts decoded_body

    test_parts = decoded_body.split('.')
    puts "TEST PARTS"
    test_parts.each_with_index do |part, index|
      puts "#{index}: #{part}"
    end

    # Extract the request parts
    request_parts = decoded_body.split('&').first.split('=').last.split('.')
    puts "REQUEST PARTS"
    puts request_parts

    puts "REQUEST PARTS 0"
    puts request_parts[0]
    puts "REQUEST PARTS 1"
    puts request_parts[1]
    puts "REQUEST PARTS 2"
    puts request_parts[2]

    # Combine the first two parts to recreate the signed message
    signed_message = "#{request_parts[0]}.#{request_parts[1]}"
    puts "SIGNED MESSAGE"
    puts signed_message

    # Calculate HMAC using OpenSSL
    puts "SHHH"
    puts Rails.application.credentials.dig(:narmi, :secret)
    hmac = OpenSSL::HMAC.digest('sha256', Rails.application.credentials.dig(:narmi, :secret), signed_message)
    calculated_hmac = Base64.urlsafe_encode64(hmac)
    puts "CALCULATED HMAC"
    puts calculated_hmac

    # Compare the calculated HMAC with the provided HMAC
    if calculated_hmac != request_parts[2]
      # If HMACs don't match, handle the error accordingly
      puts "failed to validate signed jwt"
      return
    end

    # Decode the payload from base64 and parse it as JSON
    payload = JSON.parse(Base64.decode64(request_parts[1]))


    # Now you have access to the decoded payload
    puts "validated signed jwt: #{payload}"

    redirect_to '/', notice: payload
  end

  private

  # permit the secure code to be passed in the request
  def authentication_params
    params.permit(:code, :signed_request)
  end
end
