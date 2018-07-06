Rails.application.routes.draw do
  # need namespace to do renaming below
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create]
    end
  end
  #get '/signup', to: 'api/v1/users#new'
  # rename api/v1/users to /signup
  post '/signup', to: 'api/v1/users#create'

end
