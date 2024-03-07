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
    @timestamp = Time.now.utc.strftime('%Y-%m-%dT%H:%M:%SZ')
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

  # ----------------------------------------------
  # UPDATE-ACCOUNT -------------------------------
  # ----------------------------------------------
  # response = Narmi.new(code).update_account(account_id, data)
  def update_account(account_id, data)
    put("/accounts/#{account_id}", data)
  end

  # ==============================================
  # THREADS ======================================
  # ==============================================

  # ----------------------------------------------
  # LIST -----------------------------------------
  # ----------------------------------------------
  # response = Narmi.new(code).threads
  def threads
    list = get("/threads")
    list["threads"]
  end

  # ----------------------------------------------
  # THREADS-WITH-MESSAGES ------------------------
  # ----------------------------------------------
  # response = Narmi.new(code).threads_with_messages
  def threads_with_messages
    list = get("/threads")
    list["threads"].each do |thread|
      thread["messages"] = messages(thread["id"])
    end
    list["threads"]
  end

  # ----------------------------------------------
  # CREATE-THREAD --------------------------------
  # ----------------------------------------------
  # response = Narmi.new(code).create_thread(data)
  def create_thread(data)
    post("/threads", data)
  end

  # ----------------------------------------------
  # MESSAGES -------------------------------------
  # ----------------------------------------------
  # response = Narmi.new(code).messages(thread_id)
  def messages(thread_id)
    list = get("/threads/#{thread_id}/messages")
    list["messages"]
  end

  # ----------------------------------------------
  # CREATE-MESSAGE -------------------------------
  # ----------------------------------------------
  # response = Narmi.new(code).create_message(thread_id, data)
  def create_message(thread_id, data)
    post("/threads/#{thread_id}/messages", data)
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

  def signature
    signature = OpenSSL::HMAC.digest('sha256', @exchange["secret"] , "date: #{@timestamp}")
    signature_base64 = Base64.strict_encode64(signature)
    return "keyId=\"#{@exchange["token"]}\",algorithm=\"hmac-sha256\",signature=\"#{signature_base64}\",headers=\"date\""
  end

  def request_headers
    {
      'Authorization' => "Bearer #{@exchange["token"]}",
      'date' => @timestamp,
      'Content-Type' => 'application/json',
      'Signature' => signature
    }
  end

  # ----------------------------------------------
  # GET ------------------------------------------
  # ----------------------------------------------
  def get(endpoint)
    response = @http.get(BASE_URL + endpoint, headers: request_headers)
    begin
      data = JSON.parse(response.body)
    rescue JSON::ParserError => e
      puts "Error parsing JSON: #{e.message}"
      data = nil
    end

    data
  end

  # ----------------------------------------------
  # POST -----------------------------------------
  # ----------------------------------------------
  def post(endpoint, data)
    response = @http.post(BASE_URL + endpoint, headers: request_headers, body: data.to_json)
    begin
      data = JSON.parse(response.body)
    rescue JSON::ParserError => e
      puts "Error parsing JSON: #{e.message}"
      data = nil
    end

    data
  end

  # ----------------------------------------------
  # PUT ------------------------------------------
  # ----------------------------------------------
  def put(endpoint, data)
    response = @http.put(BASE_URL + endpoint, headers: request_headers, body: data.to_json)
    begin
      data = JSON.parse(response.body)
    rescue JSON::ParserError => e
      puts "Error parsing JSON: #{e.message}"
      data = nil
    end

    data
  end

end