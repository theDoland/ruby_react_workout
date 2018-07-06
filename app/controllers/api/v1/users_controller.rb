class Api::V1::UsersController < Api::V1::BaseController
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
      respond_with(@user)
    else
      # send react a message that it didn't work
    end
  end

  def index
    respond_with User.all
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)    
    end
end
