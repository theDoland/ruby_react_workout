class CreateSetsRepsWeights < ActiveRecord::Migration[5.2]
  def change
    create_table :sets_reps_weights do |t|
      t.integer :sets
      t.integer :reps
      t.integer :weight

      t.timestamps
    end
    remove_column :exercises, :sets 
    remove_column :exercises, :reps
    remove_column :exercises, :weight
  end
end
