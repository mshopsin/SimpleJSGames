class CreateDreams < ActiveRecord::Migration
  def change
    create_table :dreams do |t|
      t.text :story

      t.timestamps
    end
  end
end
