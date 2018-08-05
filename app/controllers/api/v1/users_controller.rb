class Api::V1::UsersController < Api::V1::BaseController
  before_action :authenticate_user, :except => [:new,:create, :user, :index]

  def new
    # probably unnecessary
    @user = User.new
  end
  
  # create a user  
  def create
    if(User.find_by(email: params[:user][:email]))
      render json: "Already Exists", status: :unprocessable_entity
      return
    end

    @user = User.new(user_params)
    # check if valid
    if @user.save
      # send react a message that it worked and save the user in a session
      render json: @user, status: :created
    else
      # send react a message that it didn't work
      render json: @user, status: :unprocessable_entity
    end
  end

  def user
    @user = User.find_by(email: params[:email])
    
    if @user
      render json: @user, status: :ok
    else
      render json: "error", status: :unprocessable_entity
    end
  end

  def destroy
    @user = User.find_by(email: params[:email])
    if @user
      @user.destroy
    end
  end

  def index
    render json: User.all, status: :ok
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)    
    end
end
