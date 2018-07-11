class Exercise < ApplicationRecord
    belongs_to :user
    
    validates(:name, presence: true)
    validates(:sets, presence: true)
    validates(:reps, presence: true)
    validates(:weight, presence: true)
end
