class Api::V1::SessionsController < Api::V1::BaseController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email])
    # if the user exists and password digest matches 
    
    if user && user.authenticate(params[:session][:password])
      respond_with(@post, status: "201")
    else
      respond_with(@post, status: "204")
    end
  end

  def index
    user = User.find_by(email: params[:session][:email])
    if user && user.authenticate(params[:session][:password])
      respond_with(@post)
    else
      # not in the database
      respond_with(@post)
    end
  end
end
