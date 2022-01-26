module Mutations
    class DeleteArticle < BaseMutation
        argument :id, ID, required: true

        field :success, Boolean, null: false
        
        def resolve(id)
            article = Article.find_by(id: id)
            if article == nil
                { success: true }
            else
                article.destroy
                { success: true }
            end
            
        end
    end
end