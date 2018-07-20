require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should not create user given invalid arguments" do
    @user = User.create(name: "", email: "fadsf", password: "fa", password_confirmation: "af")
    assert_not @user.save
  end

  test "should create user given valid arguments" do
    @user = User.create(name: "donald", email: "test@test.com", password: "foobar", password_confirmation: "foobar")
    assert @user.save
  end

end
