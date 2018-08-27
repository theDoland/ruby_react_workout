module ExerciseHelper
    def helperModifyExercise(user, exerciseDay, length, itr)
        
        # add rows because new length > old length
        if length < 0
            addExercise(user, length, 0)
        else
            deleteExercise(exerciseDay, length, itr, 0)
        end
    end

    def addExercise(user, length, currCount)

        while currCount < length.abs
            @exercises = Exercise.new(name: "placeholder", dayofweek: params[:day])
            @exercises.user = user
            currCount = currCount + 1
            @exercises.save
        
        end

    end

    def deleteExercise(exerciseDay, length, itr, currCount)
        
        while currCount < length do
            exerciseDay[itr].destroy
            itr = itr - 1
            currCount = currCount + 1
        end
    end
    
    def helperModifySrw(exercise, exerciseDay, itr, user)
        srwcount = 0
                
        # if new size is greater than old size, we add srw rows
        if exercise[:srw].size - exerciseDay[itr].sets_reps_weights.size >= 0
            addSrw(srwcount, exercise, exerciseDay, itr)
        else
            deleteSrw(srwcount, exercise, exerciseDay, itr)
        end
    end

    # maybe i want to create one regardless of whether one exists (to remove placeholder bug)
    def addSrw(srwcount, exercise, exerciseDay, itr)    
        while srwcount < exercise[:srw].size - exerciseDay[itr].sets_reps_weights.size
            @sets_reps_weights = SetsRepsWeight.new(sets: 0, reps: 0, weight: 0)
            @sets_reps_weights.exercise = exerciseDay[itr]
            @sets_reps_weights.save
            srwcount += 1
        end

    end

    def deleteSrw(srwcount, exercise, exerciseDay, itr)
        exLen = exercise[:srw].size
        # calculate the number of sets to delete
        length = exerciseDay[itr].sets_reps_weights.size - exLen
        iterator = exerciseDay[itr].sets_reps_weights.size - 1
        while srwcount < length
            exerciseDay[itr].sets_reps_weights[iterator].destroy
            iterator -= 1
            srwcount += 1
        end
    end
end