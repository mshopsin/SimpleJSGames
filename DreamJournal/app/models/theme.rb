class Theme < ActiveRecord::Base
  attr_accessible :tag
  has_many :dreams, :through => :dream_themes
  has_many :dream_themes
end
