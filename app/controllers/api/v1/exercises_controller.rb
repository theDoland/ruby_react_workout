class Api::V1::ExercisesController < Api::V1::BaseController
    before_action :authenticate_user
    include ExerciseHelper
    # more network calls vs destroy all and recreate objects

    def modify_exercise
        @user = current_user
        # modify only the current days rows
        @exerciseDay = @user.exercises.where(:dayofweek => params[:day])
        
        # go through each exercise and delete the unused exercises
        length = @exerciseDay.size - params[:exercise].size
        itr = @exerciseDay.size - 1

        helperModifyExercise(@user, @exerciseDay, length, itr)
        
        render json: @user, status: :reset_content
    end
    
    def update_exercise
        @user = current_user
        @exerciseDay = @user.exercises.where(:dayofweek => params[:day])
        itr = 0

        # update the names/days for each exercise
        params[:exercise].each do |exercise|

            if !@exerciseDay[itr].update(name: exercise[:name], dayofweek: params[:day])
                render json: @user.errors, status: :unprocessable_entity
                return
            end

            itr += 1
        end

        render json: @user, status: :reset_content
    end

    def modify_srw
        @user = current_user
        @exerciseDay = @user.exercises.where(:dayofweek => params[:day])
        itr = 0
        
        params[:exercise].each do |exercise|
            helperModifySrw(exercise, @exerciseDay, itr, @user)
            itr += 1
        end

        render json: @user, status: :reset_content

    end

    def update_srw
        @user = current_user
        @exerciseDay = @user.exercises.where(:dayofweek => params[:day])
        itr = 0

        params[:exercise].each do |exercise|
            # reset iterator and update values in the sets reps and weight
            srwcount = 0
            exLen = exercise[:srw].size

            while srwcount < exLen
                if !@exerciseDay[itr].sets_reps_weights[srwcount].update(sets: exercise[:srw][srwcount][:sets], reps: exercise[:srw][srwcount][:reps], weight: exercise[:srw][srwcount][:weight])
                    render json: @user.errors, status: :unprocessable_entity
                    return
                end

                srwcount += 1
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