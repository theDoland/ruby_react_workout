class Api::V1::ExercisesController < Api::V1::BaseController
    before_action :authenticate_user

    # currently create is unused, will keep for potential refactoring!
    def create
        @user = current_user
        params[:exercise].each do |exercise|
            @exercises = Exercise.new(exercise_params(exercise))
            @exercises.user = @user

            if !@exercises.save
                render json: @exercises.errors, status: :unprocessable_entity
                return
            end
        end

        render json: @exercises, status: :created
    end

    def update
        @user = current_user

        # go through each exercise and delete the unused exercises
        length = @user.exercises.size - params[:exercise].size
        itr = @user.exercises.size - 1
        currCount = 0

        # means we are adding rows
        if length < 0
            while currCount < length.abs
                @exercises = Exercise.new(name: "placeholder", reps: 0, sets: 0, weight: 0)
                @exercises.user = @user
                currCount = currCount + 1
                @exercises.save
            
            end
        # otherwise, delete rows
        else
            while currCount < length do
                @user.exercises[itr].destroy
                itr = itr - 1
                currCount = currCount + 1
            end
        end

        # reinstatiate the iterator to start at the beginning
        itr = 0
        params[:exercise].each do |exercise|
            # update each exercise
            if !@user.exercises[itr].update(exercise_params(exercise))
                render json: @user.errors, status: :unprocessable_entity
            end
            itr = itr + 1
        end

        render json: @user, status: :reset_content
        
    end

    def index
        @user = current_user
        #@exercises = @user.exercises.where()
        render json: @user.exercises, status: :ok
    end
    private
        def exercise_params(exercise)
            exercise.permit(:name, :reps, :sets, :weight)
        end
end