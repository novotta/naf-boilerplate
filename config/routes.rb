Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # create a Post route for verifying secure code
  post '/', to: 'authentications#verify'

  namespace :api do # /api/data

    get '/data', to: 'tests#index'

    resources :dogs

  end

  root to: 'authentications#verify'

end
