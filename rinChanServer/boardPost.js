class boardPost {
	constructor(postID,boardID,name,subject,posterID,dateTime,fileName,postText,fileExt,replyToID){
		this.postID = postID;
		this.boardID = boardID;
		this.name = name;
		this.subject = subject;
		this.posterID = posterID;
		this.dateTime = dateTime;
		this.fileName = fileName;
		this.postText = postText;
		this.fileExt = fileExt;
		this.replyToID = replyToID;
	}
	op(name,subject,fileName,postText,boardID,posterID,fileExt){
		this.name = name;
		this.subject = subject;
		this.fileName = fileName;
		this.posterID = posterID;
		this.postText = postText;
		this.boardID = boardID;
		this.fileExt = fileExt;
	}
}

module.exports = boardPost;