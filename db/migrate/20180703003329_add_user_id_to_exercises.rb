class AddUserIdToExercises < ActiveRecord::Migration[5.2]
  def change
    add_column :exercises, :userId, :integer
  end
end
