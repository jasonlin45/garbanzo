<script>
    import { ref, listAll, getDownloadURL } from "firebase/storage";
    import { storage } from '../firebase';
    import { fade, crossfade, scale } from 'svelte/transition';
    import Gallery from 'svelte-image-gallery';
    import MosaicImage from '../components/MosaicImage.svelte';

    const listRef = ref(storage, 'mosaic');
    let images = [];
    let curId = 0;
    let modal = false;

    let org = "";
    let moc = "";
    // Find all the prefixes and items.
    listAll(listRef)
        .then((res) => {
            res.prefixes.forEach((folderRef) => { 
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
            });
            res.items.forEach((itemRef) => {
                let origRef = ref(storage, itemRef.fullPath.replace('mosaic', 'original'))
                Promise.all([getDownloadURL(itemRef), getDownloadURL(origRef)])
                    .then((values) => {
                        images = [...images, {id: curId++, path:values[0], orig:values[1]}]
                    })

                // console.log(itemRef.fullPath)
                // getDownloadURL(itemRef).then((url) => {
                //     images = [...images, {id: curId++, path:url}];
                // });
            // All the items under listRef.
            });
        }).catch((error) => {
            // Uh-oh, an error occurred!
    });

    function handleClick(event){
        console.log(event);
        modal = true;
        org = event.detail.orig;
        moc = event.detail.mosc;
    }

    function handleKeydown(event) {
        let keyCode = event.keyCode;
        if(keyCode == 27){
            modal = false;
        }
    }
    
    let size = 24;

</script>
<svelte:window on:keydown={handleKeydown}/>

<div class="p-20 pb-4 flex flex-col h-full space-y-4 border-2" in:fade>
    <h1 class="text-6xl font-bold text-sky-500 text-center">Gallery</h1>
    <div class="overflow-scroll flex flex-auto flex-wrap grow gap-8 justify-center">
        <!-- <Gallery on:click={handleClick}> -->
            {#each images as image}
            <MosaicImage orig={image.orig} mosc={image.path} {size} on:click={handleClick}></MosaicImage>
                <!-- <img src={image.path} alt={image.orig} class="hover:cursor-pointer bg-gray-400" in:fade> -->
            {/each}
        <!-- </Gallery> -->
    </div>
    <div class="hidden md:block w-full md:w-1/2 pt-4 mx-auto">
        <div class="h-6 w-6 mx-auto">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 490.4 490.4" style="enable-background:new 0 0 490.4 490.4;" xml:space="preserve">
            <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796
            s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z
            M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"/></svg>
        </div>

        <input class="w-full" type="range" min="12" max="100" bind:value={size}>
    </div>
</div>

<style>

input[type=range] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}

input[type=range]:focus {
  outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
}

input[type=range]::-ms-track {
  width: 100%;
  cursor: pointer;

  /* Hides the slider so custom styles can be added */
  background: transparent; 
  border-color: transparent;
  color: transparent;
}

input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 1px solid #000000;
  height: 1.3rem;
  width: 1rem;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  margin-top: -14px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d; /* Add cool effects to your sliders! */
}

/* All the same stuff for Firefox */
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  border: 1px solid #000000;
  height: 1.3rem;
  width: 1rem;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type=range]:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #0EA5E9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}

input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  border-width: 16px 0;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #0EA5E9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]:focus::-ms-fill-lower {
  background: #0EA5E9;
}
input[type=range]::-ms-fill-upper {
  background: #0EA5E9;
  border: 0.2px solid #010101;
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]:focus::-ms-fill-upper {
  background: #0EA5E9;
}

</style>