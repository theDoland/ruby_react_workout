class Api::V1::ExercisesController < Api::V1::BaseController
    before_action :authenticate_user
    include ExerciseHelper
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
        # modify only the current days rows
        @exerciseDay = @user.exercises.where(:dayofweek => params[:day])
        
        # go through each exercise and delete the unused exercises
        length = @exerciseDay.size - params[:exercise].size
        itr = @exerciseDay.size - 1

        modifyExercise(@user, @exerciseDay, length, itr)
        # reinstatiate the iterator to start at the beginning
        itr = 0

        # update the exerciseDay
        @exerciseDay = @user.exercises.where(:dayofweek => params[:day])

        # Loop through each exercise 
        # params[:exercise].each -> exercise[:srw]
        params[:exercise].each do |exercise|

            # if updating doesn't work | roadblock one is params[:day]
            if !@exerciseDay[itr].update(name: exercise[:name], dayofweek: params[:day])
                render json: @user.errors, status: :unprocessable_entity
                return
            # otherwise it updated, now update the srw for that exercise
            else
                srwcount = 0
                modifySrw(exercise, @exerciseDay, itr, @user)
            end
            itr += 1
        end

        render json: @user, status: :reset_content
        
    end

    def index
        @user = current_user
        # get the exercises for the current day
        @array = []
        
        @exercises = @user.exercises.where(:dayofweek => params[:day])

        array_index = 0
        @exercises.each do |exercise|
            @array[array_index] = []
            
            # each set and rep of that exercise
            hashArray = []
            exercise.sets_reps_weights.each do |srw|
                hash = {sets: srw[:sets], reps: srw[:reps], weight: srw[:weight]}
                hashArray.push(hash)
            end

            # form the array entry
            @array[array_index].push(name: exercise[:name], srw: hashArray, dayofweek: exercise[:dayofweek])
            array_index += 1
        end
        render json: @array, status: :ok
    end
end