export class Comment {
    constructor(commentID, answerID, commentText, isDeleted, userEmail)
    {
        this.commentID = commentID;
        this.answerID = answerID;
        this.commentText = commentText;
        this.isDeleted = isDeleted;
        this.userEmail = userEmail;
    }

    //java-style getters
    getCommentID()
    {
        return this.commentID;
    }
    getAnswerID()
    {
        return this.answerID;
    }
    getCommentText()
    {
        return this.commentText;
    }
    getIsDeleted()
    {
        return this.isDeleted;
    }
    getUserEmail()
    {
        return this.userEmail;
    }
}