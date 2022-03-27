<script>
    import UploadForm from '../components/UploadForm.svelte';
    import Mosaic from '../components/Mosaic.svelte';
    import { fade } from 'svelte/transition';
    import Spinner from '../components/Spinner.svelte';

    let mosaic = false;
    let ready = false;
    let transitioning = true;
    
    let im = "";
    let cm = "";

    let uid = "";

    $: caption = {im: im, cm: cm};

    async function handlePost(event){
        im = event.detail.im;
        cm = event.detail.cm;
        
        mosaic = true;

        const params = {
            cm: cm
        }

        let url = new URL('https://william-mosaic.herokuapp.com/im_upload');
        url.search = new URLSearchParams(params).toString();
        var data = new FormData();
        data.append('file', im);
        data.append('cm', cm);
        
        const res = await fetch(url, 
        {method: 'POST',
            body: data});

        var body = await res.json();
        let loc = body.Location;

        while(tries > 0){
            const r = await fetch(loc);
            var body = await r.json();
            if(body.state == "SUCCESS"){
                uid = body.result;
                ready = true;
                break;
            }
            else {
                tries-=1
                await new Promise(re => setTimeout(re, 5000));
            }
        }
        if(tries < 0) {
            failure = true;
        }
    }


    
</script>


<div in:fade>
    <div class="flex h-screen text-slate-700">
        {#if !mosaic}
        <div class="m-auto text-xl sm:text-3xl md:text-6xl space-y-2 font-serif" transition:fade|local on:outroend={() => transitioning = false}>
            <UploadForm on:data={handlePost}/>
        </div>
        {:else if !transitioning && ready}
        <div class="m-auto">
            <Mosaic {uid} {caption} on:back={()=> {mosaic = false; transitioning = true; ready = false;}}/>
        </div>
        {:else if !transitioning && !ready}
        <div class="m-auto">
            <Spinner/>
        </div>
        {/if}
    </div>
</div>