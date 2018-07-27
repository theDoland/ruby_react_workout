class RemoveWeightFromExercises < ActiveRecord::Migration[5.2]
  def change
    remove_column :exercises, :weight
  end
end
