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

    
    //java-style getters because javascript style is a pain to work with
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


    //OTHERS
    addComment(comment)
    {
        this.comments.push(comment);
    }
}