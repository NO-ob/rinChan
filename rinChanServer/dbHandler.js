const sqlite3 = require('sqlite3').verbose();
const boardPost = require("./boardPost.js");
const boardPair = require("./boardPair.js");
let db = new sqlite3.Database('./rinChan.db', (err) => {
	if (err){
		console.log("dbHandler::error "+err);
	} else {
		console.log("dbHandler::dbConnected");
	}
});
class dbHandler {
	dbInit(){
		console.log("dbHandler::dbInit::createPosts");
		let query = `CREATE TABLE IF NOT EXISTS Posts (
			postID INTEGER PRIMARY KEY AUTOINCREMENT, 
			boardID TEXT NOT NULL,
			replyToID INTEGER,
			name TEXT NOT NULL,
			subject TEXT,
			dateTime TEXT,
			postText TEXT,
			fileName TEXT,
			posterID TEXT NOT NULL,
			fileExt TEXT
		)`
		db.run(query);
		console.log("dbHandler::dbInit::createBoards");
		query = `CREATE TABLE IF NOT EXISTS Boards (
			boardID TEXT NOT NULL PRIMARY KEY, 
			boardName TEXT NOT NULL
		)`
		db.run(query);
		//query = `INSERT into Boards (boardID,boardName) VALUES ('b','Random')`
		//db.run(query);
		//query = `INSERT into Boards (boardID,boardName) VALUES ('g','Technology')`
		//db.run(query);
		//query = `INSERT into Boards (boardID,boardName) VALUES ('a','Anime/Manga')`
		//db.run(query);
	}
	getBoards(){
		let query = `SELECT boardID,boardName FROM Boards`
		let results = [];
		return new Promise((resolve,reject) =>{
			db.serialize(() => {
				db.all(query, (err,rows) => {
					if (err){
						console.log("dbHandler::getBoards" + err);
						reject(err);
					} else {
						rows.forEach((row)=>{				
							results.push(new boardPair(row.boardID,row.boardName));
						});
						resolve(results);
					}
				});
			});
		})
	}
	getOps(boardID){
		let query = `SELECT postID,name,subject,dateTime,postText,fileName,fileExt,replyToID FROM Posts WHERE boardID = ? AND replyToID IS NULL ORDER BY postID`
		let results = [];
		return new Promise((resolve,reject) =>{
			db.serialize(() => {
				db.all(query,boardID, (err,rows) => {
					if (err){
						console.log("dbHandler::getOps" + err);
						reject(err);
					} else {
						rows.forEach((row)=>{				
							results.push(new boardPost(row.postID,row.boardID,row.name,row.subject,null,row.dateTime,row.fileName,row.postText,row.fileExt,row.replyToID));
						});
						resolve(results);
					}
				});
			});
		})
	}
	async getThread(threadID){
		let query = `SELECT postID,boardID,name,subject,dateTime,postText,fileName,fileExt FROM Posts WHERE postID = ?`
		let results = [];
		await new Promise((resolve,reject) =>{
			db.serialize(() => {
				db.get(query,threadID, (err,row) => {
					if (err){
						console.log("dbHandler::getThread::getOp" + err);
						reject(err);
					} else {	
						if (row){
							results.push(new boardPost(row.postID,row.boardID,row.name,row.subject,null,row.dateTime,row.fileName,row.postText,row.fileExt,null));
							resolve(row);
						} else {
							console.log("dbHandler::getThread::getOp::opNotFound " + threadID);
							reject(null);
						}		
					}
				});
			});
		})
		console.log("getting thread replies");
		query = `SELECT postID,boardID,name,subject,dateTime,postText,fileName,fileExt,replyToID FROM Posts WHERE replyToID = ? ORDER BY postID`
		return new Promise((resolve,reject) =>{
			db.serialize(() => {
				db.all(query,threadID, (err,rows) => {
					if (err){
						console.log("dbHandler::getThread::getPosts" + err);
						reject(err);
					} else {
						if (rows){
							rows.forEach((row)=>{				
								results.push(new boardPost(row.postID,row.boardID,row.name,row.subject,null,row.dateTime,row.fileName,row.postText,row.fileExt,row.replyToID));
							});
						}
						resolve(results);
					}
				});
			});
		})
	}
	createOp(boardPost){
		let query = `INSERT into Posts (boardID,name,subject,postText,fileName,posterID,dateTime,fileExt) VALUES (?,?,?,?,?,?,dateTime('now'),?)`;
		return new Promise((resolve,reject) =>{
			db.serialize(() => {
				db.run(query,[boardPost.boardID,boardPost.name,boardPost.subject,boardPost.postText,boardPost.fileName,boardPost.posterID,boardPost.fileExt], function (err) {
					if (err){
						console.log("dbHandler::createOp" + err);
					} else {
						console.log("dbHandler::createOp::OpInserted ");
						console.log(this.lastID);
						resolve(this.lastID);
					}
				});
			});
		});
	}
	createPost(boardPost){
		let query = `INSERT into Posts (boardID,name,postText,fileName,posterID,replyToID,dateTime,fileExt) VALUES (?,?,?,?,?,?,dateTime('now'),?)`;
		return new Promise((resolve,reject) =>{
			db.serialize(() => {
				db.run(query,[boardPost.boardID,boardPost.name,boardPost.postText,boardPost.fileName,boardPost.posterID,boardPost.replyToID,boardPost.fileExt], function (err) {
					if (err){
						console.log("dbHandler::createPost" + err);
					} else {
						console.log("dbHandler::createPost::postInserted");
						console.log(this.lastID);
						resolve(this.lastID);
					}
				});
			});
		});
	}
	opExists(replyToID){
		let query = `SELECT * from Posts WHERE postID = ? AND replyToID IS NULL`;
		return new Promise((resolve,reject) =>{
			db.serialize(() => {
				db.get(query,[replyToID], function (err, row) {
					if (err){
						//console.log("dbHandler::replyToID" + err);
					} else {
						console.log("dbHandler::replyToID::opExists");
						if (row){
							console.log("dbHandler::replyToID::opExists::true " + row.postID);
							resolve(row.boardID);
						} else {
							console.log("dbHandler::replyToID::opExists::false");
							resolve(false);
						}
						
					}
				});
			});
		});
	}
	deletePost(postID){
		let query = `DELETE FROM Posts WHERE postID = ? VALUES (?)`;
		db.serialize(() => {
			db.run(query,postID, function (err) {
					if (err){
						console.log("dbHandler::deletePost" + err);
					} else {
						console.log("dbHandler::deletePost::postDeleted " + postID);
					}
			});
		});
	}
	

}

module.exports = dbHandler;