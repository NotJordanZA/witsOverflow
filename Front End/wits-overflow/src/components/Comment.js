export class Comment {
    constructor(commentID, answerID, commentText, isDeleted, userEmail)
    {
        this.commentID = commentID;
        this.answerID = answerID;
        this.commentText = commentText;
        this.isDeleted = isDeleted;
        this.userEmail = userEmail;
    }

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

    // //GETTERS
    // get commentID()
    // {
    //     return this._commentID;
    // }
    // get answerID()
    // {
    //     return this._answerID;
    // }
    // get commentText()
    // {
    //     return this._commentText;
    // }
    // get isDeleted()
    // {
    //     return this._isDeleted;
    // }
    // get userEmail()
    // {
    //     return this._userEmail;
    // }
    
    // //SETTERS
    // set commentID(commentID)
    // {
    //     this._commentID = commentID;
    // }
    // set answerID(answerID)
    // {
    //     this._answerID = answerID;
    // }
    // set commentText(commentText)
    // {
    //     this._commentText = commentText;
    // }
    // set isDeleted(isDeleted)
    // {
    //     this._isDeleted = isDeleted;
    // }
    // set userEmail(userEmail)
    // {
    //     this._userEmail = userEmail;
    // }
}