class Exercise < ApplicationRecord
    belongs_to :user
    has_many :sets_reps_weights, dependent: :destroy
    #validates(:name, presence: true)

end
