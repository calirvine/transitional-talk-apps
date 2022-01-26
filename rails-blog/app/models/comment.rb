class Comment < ApplicationRecord
  belongs_to :article

  def created_at_formatted
    attributes['created_at'].strftime("%Y-%m-%d")
  end
end
