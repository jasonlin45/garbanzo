<script>
    import Form from '../components/Form.svelte';
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
    let failure = false;
    async function handlePost(event){
        im = event.detail.im;
        cm = event.detail.cm;
        
        mosaic = true;

        const params = {
            im: im,
            cm: cm
        }

        let url = new URL('https://william-mosaic.herokuapp.com/image');
        url.search = new URLSearchParams(params).toString();

        const res = await fetch(url);
        let tries = 120;
        const wait_time = 5000;
        var body = await res.json();
        let loc = body.Location;
        while(tries > 0){
            await new Promise(re => setTimeout(re, 1000));
            const r = await fetch(loc);
            var body = await r.json();
            if(body.state == "SUCCESS"){
                uid = body.result;
                ready = true;
                break;
            }
            else {
                tries-=1
                await new Promise(re => setTimeout(re, 4000));
            }
        }
        if(tries < 0) {
            failure = true;
        }
    }

</script>
<!-- <Spinner/> -->
<div in:fade>
    <div class="flex h-screen text-slate-700">
        {#if !mosaic}
        <div class="m-auto text-xl sm:text-3xl md:text-6xl space-y-2 font-serif" transition:fade|local on:outroend={() => transitioning = false}>
            <Form on:data={handlePost}/>
        </div>
        {:else if !transitioning && ready}
        <div class="m-auto">
            <Mosaic {uid} {caption} on:back={()=> {mosaic = false; transitioning = true; ready = false;}}/>
        </div>
        {:else if !transitioning && !ready}
        <div class="m-auto">
            <Spinner/>
        </div>
        {:else if failure}
        <div class="m-auto">
            Request timed out.  Please refresh the page.
        </div>
        {/if}
    </div>
</div>
