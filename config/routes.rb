Rails.application.routes.draw do
  
  devise_for :users, :controllers => { registrations: 'registrations', sessions: "sessions", omniauth_callbacks: 'omniauth_callbacks'}
   
  resources :companies, only: [:show] do
     resources :documents, only: [:index, :destroy, :edit, :update]
  end
  
  root to: "pages#landing"  
  resources :users, only: [:show] 
    
  resources :companies, only: [:index, :show, :create, :destroy] do
    get "api" => "companies#api", on: :member
    get "test" => "accuracy_tests#show", on: :member
    put "test" => "accuracy_tests#update", on: :member
  end

  resources :tickets, only: [:new, :index, :create]


  resources :questions, only: [:new, :create, :edit, :update]
  get "faq" => "questions#index"


end
