<script>
    import Spinner from './Spinner.svelte';
    import MosaicImage from './MosaicImage.svelte';
    import { fade } from 'svelte/transition';
    import { createEventDispatcher } from 'svelte';
    import { storage } from '../firebase';
    import { ref, getDownloadURL } from "firebase/storage";

	const dispatch = createEventDispatcher();

    let visible = false;
    
    export let uid = "";

    const origRef = ref(storage, `original/${uid}`);
    const moscRef = ref(storage, `mosaic/${uid}`);

    
    export let caption = {im: "", cm: ""};

    const fetchImage = (async () => {
        return await Promise.all([getDownloadURL(origRef), getDownloadURL(moscRef)]);
        // await new Promise(r => setTimeout(r, 600));
        // return await response.json()
    })()

</script>

{#await fetchImage}
	<div class="h-full w-full" 
        transition:fade
        on:introstart="{() => visible = false}"
        on:outroend="{() => visible = true}">
        <Spinner/>
    </div>
{:then data}
    {#if visible}
        <div class="max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-6xl">
            <MosaicImage orig={data[0]} mosc={data[1]}/>
        </div>
        <!-- <img src={data.message} alt="Dog image" class="m-auto max-h-48 max-w-48" in:fade={{duration: 600}}/> -->
        <p class="text-3xl text-center" in:fade={{duration: 400, delay: 300}}>
            <span class="text-sky-500 font-bold">{caption.im}</span> made of <span class="text-sky-500 font-bold">{caption.cm}</span>
        </p>
        <button class="text-2xl w-full p-2 bg-sky-500 text-white rounded mt-5 transition hover:bg-sky-400"
                in:fade={{delay: 500, duration:400}} on:click={()=>{visible = false; dispatch('back');}}>NEW</button>

    {/if}
{/await}

