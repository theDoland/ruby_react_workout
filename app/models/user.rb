class User < ApplicationRecord
    validates(:name, presence: true)
    
    # valid email regex
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
    validates(:email, presence: true, format: {with: VALID_EMAIL_REGEX}, length: {maximum: 255})
    
    # bcrypt password auth
    has_secure_password
    validates(:password, presence:true, length: {minimum: 6})

end
