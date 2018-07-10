class Exercise < ApplicationRecord
    # intention is to have these be arrays
    belongs_to :user
    #serialize :name
    #serialize :sets
    #serialize :reps
    #serialize :weight
    
    validates(:name, presence: true)
    validates(:sets, presence: true)
    validates(:reps, presence: true)
    validates(:weight, presence: true)
end
