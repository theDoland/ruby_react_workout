class Api::V1::ExercisesController < Api::V1::BaseController
    before_action :authenticate_user

    def create
        puts params
        @user = current_user
        params[:exercise].each do |exercise|
            puts exercise
            @exercises = Exercise.new(exercise_params(exercise))
            @exercises.user = @user
            if @exercises.save
            else
                render json: @exercises.errors, status: :unprocessable_entity
            end
        end
        #@exercises = Exercise.new(name: params[:exercise][0][:exercise], reps: params[:exercise][0][:reps], sets: params[:exercise][0][:sets], weight: params[:exercise][0][:weight])
        

        #if @exercises.save
            render json: @exercises, status: :created
        #else
         #   render json: @exercises.errors, status: :unprocessable_entity
        #end
    end

    private
        def exercise_params(exercise)
            exercise.permit(:name, :reps, :sets, :weight)
        end
end