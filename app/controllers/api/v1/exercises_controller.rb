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

    # needs refactoring!!!
    def update
        @user = current_user
        # modify only the current days rows
        @exerciseDay = @user.exercises.where(:dayofweek => params[:day])
        
        # go through each exercise and delete the unused exercises
        length = @exerciseDay.size - params[:exercise].size
        itr = @exerciseDay.size - 1
        currCount = 0

        # means we are adding rows
        if length < 0
            while currCount < length.abs
                @exercises = Exercise.new(name: "placeholder", dayofweek: params[:day])
                @exercises.user = @user
                currCount = currCount + 1
                @exercises.save
            
            end
        # otherwise, delete rows
        else
            while currCount < length do
                @exerciseDay[itr].destroy
                itr = itr - 1
                currCount = currCount + 1
            end
        end

        # reinstatiate the iterator to start at the beginning
        itr = 0

        # Loop through each exercise 
        # params[:exercise].each -> exercise[:srw]
        params[:exercise].each do |exercise|

            # update each exercise !!! roadblock one is params[:day]
            if !@exerciseDay[itr].update(name: exercise[:name], dayofweek: params[:day])
                render json: @user.errors, status: :unprocessable_entity
                return
            else
                # loop through the sets, reps and weight
                srwcount = 0
                
                puts exercise[:srw].size - @exerciseDay[itr].sets_reps_weights.size 
                # it means we have to add
                if exercise[:srw].size - @exerciseDay[itr].sets_reps_weights.size >= 0
                    while srwcount < exercise[:srw].size - @exerciseDay[itr].sets_reps_weights.size
                        @sets_reps_weights = SetsRepsWeight.new(sets: 0, reps: 0, weight: 0)
                        @sets_reps_weights.exercise = @exerciseDay[itr]
                        @sets_reps_weights.save
                        srwcount += 1
                    end
                # otherwise we have to delete
                else
                    exLen = exercise[:srw].size
                    # calculate the number of sets to delete
                    length = @exerciseDay[itr].sets_reps_weights.size - exLen
                    iterator = @exerciseDay[itr].sets_reps_weights.size - 1
                    while srwcount < length
                        @exerciseDay[itr].sets_reps_weights[iterator].destroy
                        iterator -= 1
                        srwcount += 1
                    end
                end

                # reset iterator and update in the sets reps and weight
                srwcount = 0
                exLen = exercise[:srw].size - 1
                # somewhat unsure of this ***

                while srwcount <= exLen
                    if !@exerciseDay[itr].sets_reps_weights[srwcount].update(sets: exercise[:srw][srwcount][:sets], reps: exercise[:srw][srwcount][:reps], weight: exercise[:srw][srwcount][:weight])
                        render json: @user.errors, status: :unprocessable_entity
                        return
                    else
                        srwcount += 1
                    end
                end
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