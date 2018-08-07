class Api::V1::ReactController < Api::V1::BaseController
    def index
        render :file => 'public/index.html', :layout => false
    end
end