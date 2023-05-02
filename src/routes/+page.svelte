<script lang="ts">
    let durationPercent;

</script>


<div class = "container">
    <div class = "content">
        content
    </div>
    <div class="duration-bar">
        <div class="duration-bar-inner" style="width: {durationPercent}%"></div>
    </div>
</div>

<!--<div class = "misc">-->
<!--&lt;!&ndash;todo QR codes&ndash;&gt;-->
<!--</div>-->
<a href="/manage/">login</a>



<style>
    *{
        font-family:"Segoe UI"
     }
    .container {
        display:flex;
        justify-content: center;
        align-items: center;
        margin:0 auto;

    }
    .content{
        border: 1px solid red;
        position: absolute;
        aspect-ratio:9/16;
        max-width: 1080px;
        margin:0 auto;
        top: 0;
        left: 0;
        bottom: 10px; /*making space for the duration bar */
        right: 0;
    }
    .duration-bar{
        width: 100%;
        height: 4px;
        background-color: #ddd;
        position: absolute;
        bottom: 0;
    }
    .duration-bar-inner {
        height: 100%;
        background-color: #2196f3; /* Blue color */
        transition: width 1s linear;
    }
</style>