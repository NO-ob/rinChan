# rinChan
A nodejs based image board


# Running

## Dependencies
ImageMagick, node

## rinChanServer

The imgOutDir variable in rinChanServer/api.js needs to be set to /PATH TO/rinChanWebUI/public/images/

It can then be launched by running:
```
npm install
npm start
```

## rinChanWebUI

The apiURL variable in rinChanWebUI/src/App.svelte and rinChanWebUI/src/ReplyInputContainer.svelte needs to be set to the url the server is running on including the port 

It can then be launched by running:
```
npm install 
npm run dev
```
To build the webUI you can run:
```
npm run build
```
This will produce a minified files which can then be deployed to a server, every thing in the rinChanWebUI/public/ folder is needed



# API

## Board List

**Url for api Access:** /api/boards

**Request Type:** GET

**Returns:** List of JSON boardPair objects

**Example Output:**
```
[{boardID: g , boardName: Technology}]
```

## Post List

**Url for api Access:** /api/posts?thread=[threadID]

**Url for api Access:** /api/posts?board=[boardID]

**Request Type:** GET

**Returns:** List of JSON boardPost objects

**Example Output:**
```
[{"postID":1,"name":"Anonymous ","subject":"First
op","posterID":null,"dateTime":"2020-12-07
15:48:06","fileName":"EmuG-mLVQAAyumW.jpg","postText":"testing form
submission","fileExt":"jpeg","replyToID":null}]
```

## Post Submission

**Url for api Access:** /api/submitPost

**Request Type:** POST

**Returns:** Status

**Required Data:** HTML Form Enctype - multipart/form-data

**Values:** input type=text name=name
textarea type=text name=postText
Input type=file name=userImage accept=image/*

**Notes:** If name is blank, name will be “Anonymous”.
userImage is required if postText is blank.

Example form:
```
<form action="http://localhost:5050/api/submitPost" enctype="multipart/form-data"
method="post" id="postForm">
<input type="text" id="nameInput" placeholder="Name" name="name"/>
<textarea placeholder="Comment" id="textInput"
name="postText"></textarea>
<input type="file" id="imageInput" name="userImage" accept="image/*" />
<button id="replySubmit">Submit</button>
</form>
```

## Opening Post Submission

**Url for api Access:** /api/submitOp

**Request Type:** POST

**Returns:** Status

**Required Data:** HTML Form Enctype - multipart/form-data

**Values:** input type=text name=name
input type=text name=subject
textarea type=text name=postText
Input type=file name=userImage accept=image/*

**Notes:** If name is blank, name will be “Anonymous”.
userImage must contain an image.
postText or subject must contain text.

**Example form:**
```
<form action="http://localhost:5050/api/submitPost" enctype="multipart/form-data"
method="post" id="postForm">
<input type="text" id="nameInput" placeholder="Name" name="name"/>
<textarea placeholder="Comment" id="textInput"
name="postText"></textarea>
<input type="file" id="imageInput" name="userImage" accept="image/*" />
<button id="replySubmit">Submit</button>
</form>
```

 
