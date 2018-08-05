class AddIdToSetsRepsWeights < ActiveRecord::Migration[5.2]
  def change
    add_column :sets_reps_weights, :exercise_id, :integer
  end
end
