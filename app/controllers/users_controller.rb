class UsersController < ApplicationController
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
    else
      # send react a message that it didn't work
    end
  end

  private
    def user_params
      params.require(:user).permit(:name, :email, :password, :password_confirmation)    
    end
end
