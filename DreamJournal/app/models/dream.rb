class Dream < ActiveRecord::Base
  attr_accessible :story

  has_many :themes, :through => :dream_themes
  has_many :dream_themes
end
