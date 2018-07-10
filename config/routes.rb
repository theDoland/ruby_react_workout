Rails.application.routes.draw do
  # need namespace to do renaming below
  namespace :api do
    namespace :v1 do
      #resources :users, :sessions
      #post 'signup' => 'sessions#create' pretty sure i can refactor to this
    end
  end
  # rename api/v1/users to /signup
  post '/api/v1/signup', to: 'api/v1/users#create'
  post '/api/v1/login', to: 'api/v1/sessions#create'
  #patch ?
  get '/api/v1/save', to: 'api/v1/users#save'
  post '/api/v1/user_token', to: 'user_token#create'

end
