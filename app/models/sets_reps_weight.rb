class SetsRepsWeight < ApplicationRecord
    belongs_to :exercise

    validates(:sets, presence: true)
    validates(:reps, presence: true)
    validates(:weight, presence: true)
end
