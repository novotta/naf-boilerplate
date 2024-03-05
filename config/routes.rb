Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # create a Post route for verifying secure code
  post '/', to: 'authentication#verify'

  namespace :api do
    resources :accounts, only: [:index] do
      collection do
        post '/favorite', to: 'accounts#favorite'
        post '/unfavorite', to: 'accounts#unfavorite'
      end
    end
    resources :threads, only: [:index] do
    end
  end

  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

end
