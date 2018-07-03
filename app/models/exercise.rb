class Exercise < ApplicationRecord
  # intention is to have these be arrays
  serialize :name
  serialize :sets
  serialize :reps
  serialize :weight

end
