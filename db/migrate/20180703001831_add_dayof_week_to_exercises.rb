class AddDayofWeekToExercises < ActiveRecord::Migration[5.2]
  def change
    add_column :exercises, :dayofweek, :string
  end
end
