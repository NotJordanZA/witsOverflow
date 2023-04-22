export class Question {
    //creating this constructor for testing purposes
    constructor(questionID, questionTitle, questionText, votes, answerCount, viewCount, timeAsked, firstName, tags)
    {
        //console.log("Creating object...");
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


    addComment(comment)
    {
        this.comments.push(comment);
    }
    addAnswer(answer)
    {
        this.answers.push(answer);
    }
}
