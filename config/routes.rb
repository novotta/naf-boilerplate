Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # create a Post route for verifying secure code
  post '/', to: 'authentication#verify'

  namespace :api do # /api/data

    get '/data', to: 'tests#index'

    resources :dogs

  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
