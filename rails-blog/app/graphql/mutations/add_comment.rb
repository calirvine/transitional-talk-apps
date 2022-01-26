module Mutations
    class AddComment < BaseMutation
        argument :article_id, Int, required: true
        argument :commenter, String, required: true
        argument :body, String, required: true

        type Types::CommentType
        
        def resolve(article_id: , commenter:, body:)
            article = Article.find(article_id)
            comment = article.comments.create(commenter: commenter, body: body)
            comment
        end
    end
end