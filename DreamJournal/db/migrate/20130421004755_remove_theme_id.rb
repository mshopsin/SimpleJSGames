class RemoveThemeId < ActiveRecord::Migration
  def change
  remove_column :themes, :dream_theme_id
  end
end
