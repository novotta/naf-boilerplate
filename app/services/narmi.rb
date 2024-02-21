require "http"

# ================================================
# SERVICES->NARMI ================================
# ================================================
class Narmi

  BASE_URL = 'https://api.sandbox.narmi.dev/v1'

  # ----------------------------------------------
  # INITIALIZE -----------------------------------
  # ----------------------------------------------
  def initialize(code)
    logger = Logger.new($stdout)
    @http = HTTP.use(logging: {logger: logger})
    @exchange = exchange_token(code)
    puts "INITIALIZED"
    puts @exchange.inspect
  end

  # ==============================================
  # ACCOUNTS =====================================
  # ==============================================

  # ----------------------------------------------
  # LIST -----------------------------------------
  # ----------------------------------------------
  # response = Narmi.new(code).accounts
  # response = Narmi.new('ZBUELMEZWLKsJufHIqYTJn8sPZnwL0a8').accounts
  def accounts
    puts "GET ACCOUNTS"
    get("/accounts")
  end




  # ==============================================
  # PRIVATE ======================================
  # ==============================================
  private

  # ----------------------------------------------
  # EXCHANGE-TOKEN -------------------------------
  # ----------------------------------------------
  def exchange_token(code)
    payload = {
      "grant_type": "authorization_code",
      "code": code,
      "scope": "read write read:profile write:preferences",
      "client_id": Rails.application.credentials.dig(:narmi, :id),
      "client_secret": Rails.application.credentials.dig(:narmi, :secret)
    }

    HTTP.headers("Content-Type" => "application/json").post("https://api.sandbox.narmi.dev/v1/tokens", json: payload).parse
  end

  # # ----------------------------------------------
  # # POST -----------------------------------------
  # # ----------------------------------------------
  # def post(route, body)
  #   begin
  #     response = @connection.post(route) do |request|
  #       request.body = body.to_json
  #     end
  #     puts response
  #     return response
  #   rescue => e
  #     p e.message
  #     p e.backtrace.join("\n")
  #   end
  # end

  # ----------------------------------------------
  # GET ------------------------------------------
  # ----------------------------------------------
  def get(endpoint)
    date = Time.now.utc.strftime('%Y-%m-%dT%H:%M:%SZ')

    puts "EXCHANGE"
    puts @exchange
    puts @exchange[:token]
    puts @exchange[:secret]

    # Calculate HMAC using OpenSSL
    signature = OpenSSL::HMAC.digest('sha256', @exchange[:secret] , "date: #{date}")
    signature_base64 = Base64.strict_encode64(signature)

    # Construct the Signature header
    sig_header = "keyId=\"#{@exchange[:token]}\",algorithm=\"hmac-sha256\",signature=\"#{signature_base64}\",headers=\"date\""

    # Construct request headers
    request_headers = {
      'Authorization' => "Bearer #{@exchange[:token]}",
      'date' => date,
      'Content-Type' => 'text/javascript',
      'Signature' => sig_header
    }

    response = @http.get(BASE_URL + endpoint, headers: request_headers)

    begin
      response_obj = JSON.parse(response.body)
    rescue JSON::ParserError => e
      puts "Error parsing JSON: #{e.message}"
      response_obj = nil
    end

    puts "RESPONSE"
    puts response_obj

    response_obj
  end

  # # ----------------------------------------------
  # # DELETE ---------------------------------------
  # # ----------------------------------------------
  # def delete(route)
  #   begin
  #     response = @connection.delete(route)
  #     return JSON.parse(response.body)
  #   rescue => e
  #     p e.message
  #     p e.backtrace.join("\n")
  #   end
  # end
end