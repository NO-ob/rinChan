<script>
import { onMount } from "svelte";
    export let post;
    let imagePath, thumbPath;   
    let showThumb = true;
    let url = document.URL.substr(0,document.URL.lastIndexOf("/")+1);
    //Set file paths if the post has a file
    if (post.fileName){
            imagePath = "images/" + (post.replyToID ? post.replyToID : post.postID) + "/" + post.postID + "." + post.fileExt;
            thumbPath = "images/" + (post.replyToID ? post.replyToID : post.postID) + "/thumb_" + post.postID + "." + post.fileExt;
    }
    function thumbToggle(){
        showThumb = !showThumb;
    }
</script>
<style>
    .postContainer{
        background-color: var(--primaryColour);
        border-radius: 0.5em;
        box-shadow: 0 0 1px 1px var(--secondaryAccent);
        padding: 0.5em;
        color: var(--primaryAccent);
        margin: 1em;
        display: table;
        min-width: 20%;
        max-width: 90%;
    }
    .postHeader {
        display: table-row;
    }
    ul {
        list-style-type: none;
    }
    li {
        padding: 0 0.5em 0 0;
        float: left;
    }
    #name {
        color: var(--secondaryAccent);
    }
    .postBody{
        clear: both;
    }
    .postImage{
        width: 100%;
        float: left;
        padding: 0 1em 0 0;
    }
    .postThumb{
        width: 7em;
        float: left;
        padding: 0 1em 0 0;
    }
    .postBody > p{
        padding: 0.5em;
        margin: 0.5em;
    }
    a{
        font-size:0.8em;
    }
</style>
<div class="postContainer">
    <ul class="postHeader">
        <li id="name">{post.name}</li>
        <li>{post.dateTime}</li>
        <li>Post#{post.postID}</li>
    </ul>
    <ul class="postHeader">
        <li><a target="_blank" href={imagePath}>{post.fileName}</a></li>
        <li><a target="_blank" href="https://yandex.com/images/search?rpt=imageview&url={url+imagePath}">Yandex</a></li>
        <li><a target="_blank" href="https://www.google.com/searchbyimage?image_url={url+imagePath}">Google</a></li>
        <li><a target="_blank" href="https://saucenao.com/search.php?url={url+imagePath}">SauceNao</a></li>
    </ul>
    <div class="postBody">
        {#if post.fileName != ""}
            {#if showThumb}
                <img class="postThumb" src="{thumbPath}" alt="{post.fileName}" on:click={thumbToggle}>
            {:else}
                <img class="postImage" src="{imagePath}" alt="{post.fileName}" on:click={thumbToggle}>
            {/if}
            
        {/if}
        <p class="postText">{post.postText}</p>
    </div>
</div>