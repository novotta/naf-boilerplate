class AuthenticationsController < ApplicationController

  # Action method to handle the POST request
  def verify
    # Extract the signed_request parameter from the POST request
    signed_request = authentication_params[:signed_request]
    puts "SIGNED REQUEST"
    puts signed_request

    # Split the signed request into three parts
    encoded_signature, encoded_payload = signed_request.split('.', 2)
    puts "ENCODED SIGNATURE"
    puts encoded_signature

    # Decode the encoded signature and payload from base64
    signature = Base64.urlsafe_decode64(encoded_signature)
    puts "SIGNATURE"
    puts signature
    payload = Base64.urlsafe_decode64(encoded_payload)
    puts "PAYLOAD"
    puts payload

    # Calculate the expected signature of the request using your Client Secret
    expected_signature = OpenSSL::HMAC.digest(OpenSSL::Digest.new('sha256'), authentication_params[:code], encoded_payload)

    puts "EXPECTED SIGNATURE"
    puts expected_signature

    # Compare the expected signature with the provided signature
    if secure_compare(expected_signature, signature)
      puts "VALID SIGNATURE"
      # If signatures match, decode the payload from JSON
      user_info = JSON.parse(payload)

      puts "USER INFO"
      puts user_info

      # Now you have access to the decoded user information
      # You can process it further as needed
      # For example, you can access user_info['user_id'], user_info['email'], etc.

      redirect_to '/', notice: user_info.to_json
    else
      puts "INVALID SIGNATURE"
      # If signatures don't match, handle the error accordingly
      redirect_to '/', alert: 'Invalid signature'
    end
  end

  private

  # Constant-time comparison algorithm to mitigate timing attacks
  def secure_compare(a, b)
    return false if a.length != b.length

    l = a.unpack "C#{a.length}"
    res = 0
    b.each_byte { |byte| res |= byte ^ l.shift }
    res.zero?
  end

  # permit the secure code to be passed in the request
  def authentication_params
    params.permit(:code, :signed_request)
  end
end
