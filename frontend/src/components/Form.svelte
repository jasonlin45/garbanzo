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
    let imPh = "a " + getRandomAnimal();
    let cmPh = "anything";

    let image = "";
    let composition = "";

    $: disabled = !(image.length && composition.length);

    function submit() {
		dispatch('data', {
			im: image,
            cm: composition
		});
	}

    let a1 = true;
    let a2 = false;
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
    <h1 class="font-serif">I want a picture of:</h1>
    {#if a1 || a2}
    <input class="border-b-4 outline-none bg-sky-50 dark:bg-transparent dark:text-sky-50 dark:border-sky-500 border-sky-200 text-sky-500"
            type="text" 
            placeholder={imPh} 
            bind:value={image} 
            in:placeHolderTypewriter
            out:placeHolderTypewriter|local="{{delay: 1500}}"
            on:introend={() => {a1 = false; imPh = "a " + getRandomAnimal()}}
            on:outroend={() => a1 = true}
            on:input={() => {a2 = true; imPh = ""}}>
    {/if}
    <h1 class="font-serif">made out of:</h1>
    <div class="pb-4 flex gap-8">
        {#if b1 || b2}
        <input class="border-b-4 outline-none dark:bg-transparent dark:text-sky-50 dark:border-sky-500 bg-sky-50 border-sky-200 text-sky-500"
                type="text" 
                placeholder={cmPh} 
                bind:value={composition} 
                in:placeHolderTypewriter="{{delay: 500}}"
                out:placeHolderTypewriter|local="{{delay: 1800}}"
                on:introend={() => {b1 = false; cmPh = getRandomAnimal()+"s"}}
                on:outroend={() => b1 = true}
                on:input={() => {b2 = true; cmPh = ""}}>
        {/if}
        <Info title="Put 'anything' to use random images!"/>
    </div>
    <button class="font-sans font-medium px-8 text-lg sm:text-2xl md:text-4xl 
                {disabled ? "bg-sky-50 text-sky-200": "bg-sky-500 text-white hover:bg-sky-400"} 
                p-4 rounded w-full transition duration-300" {disabled}
                on:click|once={submit}>
                SUBMIT
    </button>
</div>