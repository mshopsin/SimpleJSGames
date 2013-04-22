class CreateThemes < ActiveRecord::Migration
  def change
    create_table :themes do |t|
      t.string :tag
      t.integer :dream_theme_id

      t.timestamps
    end
  end
end
