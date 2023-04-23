export class Answer {
    constructor(answerID, userEmail, firstName, answerText, votes, comments)
    {
        this.answerID = answerID;
        this.userEmail = userEmail;
        this.firstName = firstName;
        this.answerText = answerText;
        this.votes = votes;
        this.comments = comments;
    }

    
    getAnswerID()
    {
        return this.commentID;
    }
    getUserEmail()
    {
        return this.userEmail;
    }
    getFirstName()
    {
        return this.firstName;
    }
    getAnswerText()
    {
        return this.answerText;
    }
    getVotes()
    {
        return this.votes;
    }
    getComments()
    {
        return this.comments;
    }
    getComment(index)
    {
        return this.comments[index];
    }


    // //GETTERS
    // get answerID()
    // {
    //     return this._answerID;
    // }
    // get userEmail()
    // {
    //     return this._userEmail;
    // }
    // get firstName()
    // {
    //     return this._firstName;
    // }
    // get answerText()
    // {
    //     return this._answerText;
    // }
    // get votes()
    // {
    //     return this._votes;
    // }
    // get comments()
    // {
    //     return this._comments();
    // }

    // //SETTERS
    // set answerID(answerID)
    // {
    //     this._answerID = answerID;
    // }
    // set userEmail(userEmail)
    // {
    //     this._userEmail = userEmail;
    // }
    // set firstName(firstName)
    // {
    //     this._firstName = firstName;
    // }
    // set answerText(answerText)
    // {
    //     this._answerText = answerText;
    // }
    // set votes(votes)
    // {
    //     this._votes = votes;
    // }
    // set comments(comments)
    // {
    //     this._comments = comments;
    // }

    //OTHERS
    addComment(comment)
    {
        this.comments.push(comment);
    }
}