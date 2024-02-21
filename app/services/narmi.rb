require "http"

# ================================================
# SERVICES->NARMI ================================
# ================================================
class Narmi

  BASE_URL = 'https://api.sandbox.narmi.dev/v1'

  # ----------------------------------------------
  # INITIALIZE -----------------------------------
  # ----------------------------------------------
  def initialize(token, secret)
    logger = Logger.new($stdout)
    @http = HTTP.use(logging: {logger: logger})
  end

  def new_request
    @http.basic_auth(user: @organization_id, pass: @api_key).headers(accept: "application/json")
  end

  # ==============================================
  # ACCOUNTS =====================================
  # ==============================================

  # ----------------------------------------------
  # CREATE ---------------------------------------
  # ----------------------------------------------
  # response = Neon.new(organization).create_account(account_params)
  def create_account(account_params)
    if account_params[:account_type].downcase == "company"
      payload = {
        "companyAccount": {
          "origin": {
            "originDetail": "Email CRM"
          },
          "name": account_params[:company_name]
        }
      }
    else
      payload = {
        "individualAccount": {
          "primaryContact": {
            "firstName": account_params[:first_name],
            "lastName": account_params[:last_name],
            "email1": account_params[:email],
          },
          "origin": {
            "originDetail": "Email CRM"
          },
          "company": {
            "id": account_params[:company_id].present? ? account_params[:company_id] : nil,
          },
        }
      }
    end
    new_account = new_request.post(BASE_URL + "/accounts", json: payload)
    response = new_request.get(BASE_URL + "/accounts/#{new_account.parse['id']}")
    if account_params[:account_type].downcase == "company"
      account = {
        account_id: response.parse['companyAccount']['accountId'],
        name: response.parse['companyAccount']['name'],
      }
    else
      account = {
        account_id: response.parse['individualAccount']['accountId'],
        name: response.parse['individualAccount']['primaryContact']['firstName'] + " " + response.parse['individualAccount']['primaryContact']['lastName'],
        email: response.parse['individualAccount']['primaryContact']['email1']
      }
    end

    return account
  end

  # ----------------------------------------------
  # SEARCH ---------------------------------------
  # ----------------------------------------------
  # response = Neon.new(organization).search_account(['seth@novotta.com','justin@novotta.com'])
  def search_account(email)
    payload = {
      outputFields: [
        "Account ID",
        "Email 1",
        "First Name",
        "Last Name"
      ],
      pagination: {
        currentPage: 0,
        pageSize: 10
      },
      searchFields: [
        {
          field: "email",
          operator: "EQUAL",
          value: email
        }
      ]
    }
    response = new_request.post(BASE_URL + "/accounts/search", json: payload)

    return response.parse
  end

  # ----------------------------------------------
  # GET-COMPANIES-LIST ---------------------------
  # ----------------------------------------------
  # response = Neon.new(organization).get_companies_list
  def get_companies_list
    response = new_request.get(BASE_URL + "/accounts", params: {"userType": "COMPANY", "pageSize": 10000})

    return response.parse
  end

  # ==============================================
  # ACTIVITIES ===================================
  # ==============================================

  # ----------------------------------------------
  # CREATE ---------------------------------------
  # ----------------------------------------------
  # response = Neon.new(organization).create_activity(activity_params)
  def create_activity(activity_params)
    payload = {
      "subject": activity_params[:subject],
      "note": activity_params[:note],
      "activityDates": {
        "startDate": Time.now,
        "timeZone": {
          "id": "1",
          "status": "ACTIVE"
        }
      },
      "clientId": activity_params[:account_id].to_s,
      "status": {
        "id": "2",
        "status": "ACTIVE"
      },
      "priority": "Normal"
    }
    new_activity = new_request.post(BASE_URL + "/activities", json: payload)

    return new_activity.parse
  end




  # # ==============================================
  # # PRIVATE ======================================
  # # ==============================================
  # private

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

  # # ----------------------------------------------
  # # GET ------------------------------------------
  # # ----------------------------------------------
  # def get(route, params)
  #   begin
  #     response = @connection.get(route) do |request|
  #       request.params = params unless params.nil?
  #     end
  #     return JSON.parse(response.body)
  #   rescue => e
  #     p e.message
  #     p e.backtrace.join("\n")
  #   end
  # end

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