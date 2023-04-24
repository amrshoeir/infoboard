
<div class = "container">
    <div class = "content">
        <p> content </p>
    </div>
    <div class="duration-bar">

    </div>
</div>

<div class = "misc">
<!--todo QR codes-->
</div>

<a href="/manage/">login</a>

<style>
    *{
        font-family:"Segoe UI"
     }
    .container{
        position: relative;
        width: 100%;
        padding-top: 56.25%; /* 16:9 aspect ratio */
    }
    .content{
        border: 1px solid red;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 10px; /*making space for the duration bar */
        right: 0;
    }
    .duration-bar{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 5px; /* set the height of the duration bar */
        background-color: blue; /* set the color of the duration bar */
    }
</style>