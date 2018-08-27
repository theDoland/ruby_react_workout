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

  patch '/api/v1/modify_exercise', to: 'api/v1/exercises#modify_exercise'
  patch '/api/v1/update_exercise', to: 'api/v1/exercises#update_exercise'
  patch '/api/v1/modify_srw', to: 'api/v1/exercises#modify_srw'
  patch '/api/v1/update_srw', to: 'api/v1/exercises#update_srw'
  get 'api/v1/index', to: 'api/v1/exercises#index'
  
  delete '/api/v1/delete_user', to: 'api/v1/users#destroy'
  get 'api/v1/user', to: 'api/v1/users#user'
  get '/*path', to: 'api/v1/react#index'
end
