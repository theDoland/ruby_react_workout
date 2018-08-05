class CreateExercises < ActiveRecord::Migration[5.2]
  def change
    create_table :exercises do |t|
      t.string :name
      t.integer :sets
      t.integer :reps
      t.integer :weight

      t.timestamps
    end
  end
end
