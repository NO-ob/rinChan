<script>
    let urlparams = new URLSearchParams(window.location.search);
    let threadID = urlparams.get('thread');
    let boardID = urlparams.get('board');
    let boardPost = {
        "name": "Anonymous ",
        "subject":"",
        "posterID":"",
        "replyToID": "",
        "postText":"",
        "boardID":"",
    }
    let apiURL="APIURL";
    boardPost.replyToID = threadID;
    boardPost.boardID = boardID;
    let imageSource;
    // Loads a preview of an image the user is about to upload, this is called when the file input is updated
    function setImagePreview(){
            let reader = new FileReader();
            reader.readAsDataURL(document.getElementById("imageInput").files[0]);
            reader.onloadend = function(readerData){
                imageSource = readerData.target.result;
            }
    }

    //Function to send the reply to the api
    async function submitReply(){
        console.log(boardPost);
        let formData = new FormData(document.getElementById("postForm"));
        formData.append('posterID', boardPost.posterID);
        formData.append('boardID', boardPost.boardID);
        formData.append('replyToID', boardPost.replyToID);
        let url;
        if (threadID != null){
            url = apiURL+"submitPost";
        } else {
            url = apiURL+"submitOp";
        }
        let res = await fetch(url,{
            method: 'POST',
            body: formData,
        });

        let status = await res.status
        let response = await res.json();
        console.log(status);
        if (status != 200){
            alert(response.error);
        } else {
            location.reload();
        }
    }
    function validateInputs(){
        submitReply();
    }
</script>
<style>
    .replyBox{
        margin:auto;
        margin-top: 40px;
        background-color: var(--primaryColour);
        border-radius: 0.5em;
        box-shadow: 0 0 1px 1px var(--secondaryAccent);
        padding: 0.5em;
        color: var(--primaryAccent);
        display: table;
        min-width: 15%;
        max-width: 95%;
    }
    #imagePreview {
        width: 5em;
    }
    #postForm{
        width:100%
    }
    button,input,textarea{
        padding: 0 0.4em;
        font-size: 0.8em;
        margin: 0;
        margin-bottom: 1em;
        border: 1px;
        border-style: solid;
        border-color: var(--secondaryAccent);
        border-radius: 2px;
        color:var(--primaryAccent);
        background-color: var(--secondaryColour);
    }
    textarea{
        width:100%;
        min-height:10em;
    }

</style>


<div class="replyBox">
    <form action="{apiURL+"/submitPost"}" enctype="multipart/form-data" method="post" id="postForm">
        <input type="text" id="nameInput" placeholder="Name" name="name" bind:value={boardPost.name}/>
        {#if threadID == null}
            <input type="text" id="subjectInput" placeholder="Subject" name="subject" bind:value={boardPost.subject}/>
        {/if}
        <textarea placeholder="Comment" id="textInput" name="postText" bind:value={boardPost.postText}></textarea>
        {#if imageSource != null}
            <img src={imageSource} id="imagePreview" alt="">
        {/if}
        <input type="file" id="imageInput" name="userImage" accept="image/*" on:change={setImagePreview}/>
        <button id="replySubmit" on:click|preventDefault={validateInputs}>Submit</button>
    </form>    
</div>