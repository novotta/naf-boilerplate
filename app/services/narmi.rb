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
  end

  # ==============================================
  # ACCOUNTS =====================================
  # ==============================================

  # ----------------------------------------------
  # LIST -----------------------------------------
  # ----------------------------------------------
  # response = Narmi.new(code).accounts
  def accounts
    list = get("/accounts")
    list["accounts"]
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

  # ----------------------------------------------
  # GET ------------------------------------------
  # ----------------------------------------------
  def get(endpoint)
    date = Time.now.utc.strftime('%Y-%m-%dT%H:%M:%SZ')

    # Calculate HMAC using OpenSSL
    signature = OpenSSL::HMAC.digest('sha256', @exchange["secret"] , "date: #{date}")
    signature_base64 = Base64.strict_encode64(signature)

    # Construct the Signature header
    sig_header = "keyId=\"#{@exchange["token"]}\",algorithm=\"hmac-sha256\",signature=\"#{signature_base64}\",headers=\"date\""

    # Construct request headers
    request_headers = {
      'Authorization' => "Bearer #{@exchange["token"]}",
      'date' => date,
      'Content-Type' => 'text/javascript',
      'Signature' => sig_header
    }

    response = @http.get(BASE_URL + endpoint, headers: request_headers)

    begin
      data = JSON.parse(response.body)
    rescue JSON::ParserError => e
      puts "Error parsing JSON: #{e.message}"
      data = nil
    end

    data
  end

end