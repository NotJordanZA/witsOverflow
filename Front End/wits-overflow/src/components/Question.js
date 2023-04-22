class Question {
    //creating this constructor for testing purposes
    constructor(questionID, questionTitle, questionText, votes, answerCount, viewCount, timeAsked, firstName, tags)
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
    }

    get questionID()
    {
        return this.questionID;
    }
    get questionText()
    {
        return this.questionText;
    }
    get votes()
    {
        return this.votes;
    }
    get answerCount()
    {
        return this.answerCount;
    }
    get viewCount()
    {
        return this.viewCount;
    }
    get timeAsked()
    {
        return this.timeAsked;   
    }
    get userFirstName()
    {
        return this.userFirstName;
    }
    get tags()
    {
        return this.tags;
    }
    get answers()
    {
        return this.answers;
    }
    get comments()
    {
        return this.comments;
    }

    addComment(comment)
    {
        this.comments[this.comments.length] = comment;
    }

    addAnswer(answer)
    {
        this.answers[this.answers.length] = answer;
    }
}
