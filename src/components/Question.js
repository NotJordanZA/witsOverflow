export class Question {
    //creating the constructor for the question object
    constructor(questionID, questionTitle, questionText, votes, answerCount, viewCount, timeAsked, firstName, tags, currEmail, reported)
    {
        this.questionID = questionID;
        this.questionTitle = questionTitle;
        this.questionText = questionText;
        this.votes = votes;
        this.answerCount = answerCount;
        this.viewCount = viewCount;
        this.timeAsked = timeAsked;
        this.firstName = firstName;
        this.tags = tags;
        this.comments = [];
        this.answers = [];
        this.currEmail = currEmail;
        this.reported = reported;
    }

    //java-style getters
    getQuestionID()
    {
        return this._questionID;
    }
    getQuestionTitle()
    {
        return this._questionTitle;
    }
    getQuestionText()
    {
        return this._questionText;
    }
    getVotes()
    {
        return this._votes;
    }
    getAnswerCount()
    {
        return this._answerCount;
    }
    getViewCount()
    {
        return this._viewCount;
    }
    getTimeAsked()
    {
        return this._timeAsked;
    }
    getFirstName()
    {
        return this._firstName;
    }
    getTags()
    {
        return this._tags;
    }
    getComments()
    {
        return this._comments;
    }
    getAnswers()
    {
        return this._answers;
    }
    getCurrEmail()
    {
        return this._currEmail;
    }
    getReported()
    {
        return this._reported;
    }

    //OTHERS  
    addComment(comment)
    {
        this.comments.push(comment);
    }
    addAnswer(answer)
    {
        this.answers.push(answer);
    }

}
