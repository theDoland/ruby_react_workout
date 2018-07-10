class Api::V1::UsersController < Api::V1::BaseController
  #before_action :set_user, only: [:save]
  before_action :authenticate_user, :except => [:new,:create]

  def new
    # probably unnecessary
    @user = User.new
  end
  
  # create a user  
  def create
    @user = User.new(user_params)
    # check if valid
    if @user.save
      # send react a message that it worked and save the user in a session
      #respond_with(@user)
      render json: @user, status: :created
    else
      # send react a message that it didn't work
      puts "fail"
    end
  end

  def index
    respond_with User.all
  end

  def save
    puts "SOMETHING PLS"
    puts current_user
    #@user = User.find(session[:user_id])
    puts "this is the session?"
    puts "hello"
    #respond_with @user
    render json: current_user.as_json
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)    
    end

    def exercise_params
      params.require(:exercise).permit(:name, :sets, :reps, :weight)
    end

    def set_user
      @user = User.find(params[:id])
    end
end
