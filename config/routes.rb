Rails.application.routes.draw do
  mount Knock::Engine => '/knock'
  # need namespace to do renaming below
  namespace :api do
    namespace :v1 do
      #resources :users, :sessions
      #post 'signup' => 'sessions#create' pretty sure i can refactor to this
    end
  end
  post '/api/v1/signup', to: 'api/v1/users#create'
  post '/api/v1/user_token', to: 'user_token#create'
  post '/api/v1/create_exercise', to: 'api/v1/exercises#create'
  patch '/api/v1/update_exercise', to: 'api/v1/exercises#update'
  get 'api/v1/index', to: 'api/v1/exercises#index'
  delete '/api/v1/delete_user', to: 'api/v1/users#destroy'
  get 'api/v1/user', to: 'api/v1/users#user'
  get '/*path', to: 'api/v1/react#index'
end
