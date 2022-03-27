<script>
    import { placeHolderTypewriter } from '../animations';
    import { createEventDispatcher } from 'svelte';
    import Info from './Info.svelte';

	const dispatch = createEventDispatcher();

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const SAMPLES = [
        "rat",
        "donkey",
        "horse",
        "kangaroo",
        "dog",
        "cat",
        "cow",
        "giraffe",
        "molerat",
        "flower",
        "car",
        "pear"
    ]

    function getRandomAnimal() {
        return SAMPLES[getRandomInt(SAMPLES.length)];
    }

    // placeholder text
    let files = null;
    let cmPh = getRandomAnimal() + "s";

    let image = "";
    let composition = "";

    $: disabled = !(!(files === null) && composition.length);

    function submit() {
        console.log(files[0])
		dispatch('data', {
			im: files[0],
            cm: composition
		});
	}
    let b1 = true;
    let b2 = false;

    function handleKeydown(event) {
        let keyCode = event.keyCode;
        if(keyCode == 13 && !disabled){
            submit();
        }
    }

</script>
<svelte:window on:keydown={handleKeydown}/>

<div class="space-y-2">
    <h1 class="font-serif">I want this picture:</h1>
    <input class="text-2xl py-6 outline-none text-sky-500"
            type="file" 
            bind:files
            in:placeHolderTypewriter>
    <h1 class="font-serif">made out of:</h1>
    <div class="pb-4 flex gap-8">
        {#if b1 || b2}
        <input class="border-b-4 outline-none bg-sky-50 border-sky-200 text-sky-500"
                type="text" 
                placeholder={cmPh} 
                bind:value={composition} 
                in:placeHolderTypewriter="{{delay: 500}}"
                out:placeHolderTypewriter|local="{{delay:1800}}"
                on:introend={() => {b1 = false; cmPh = getRandomAnimal()+"s"}}
                on:outroend={() => b1 = true}
                on:input={() => {b2 = true; cmPh = ""}}>
            {/if}
            <Info title="Put 'anything' to use random images!"/>
    </div>
    <button class="font-sans font-medium px-8 text-lg sm:text-2xl md:text-4xl 
                {disabled ? "bg-sky-50 text-sky-200": "bg-sky-500 text-white hover:bg-sky-400"} 
                p-4 outline rounded w-full transition duration-300" {disabled}
                on:click|once={submit}>
                SUBMIT
    </button>
</div>