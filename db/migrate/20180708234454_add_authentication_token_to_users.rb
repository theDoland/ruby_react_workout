class AddAuthenticationTokenToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :auth_token, :string, default: ""
    add_index :users, :auth_token
  end
end
