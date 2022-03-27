<script>
  import { typeWriter } from '../animations';

  const PHRASES = [
    "Big things are coming...",
    "Mosaic on the way!",
    "Please wait while we load your life into this computer...",
    "You too could be made of bees...",
    "Engineering perfection...",
    "Our elite team of monkeys is working hard...",
    "Crunching colors...",
    "Finger painting..."
  ]

  let previous = '';

  function getRandomInt(max) {
        return Math.floor(Math.random() * max);
  }
  
  function getRandomPhrase() {
        let n = PHRASES[getRandomInt(PHRASES.length)]
        if (previous == n){
          return getRandomPhrase()
        }
        return n;
  } 

  let phrase = getRandomPhrase();


  let a = true;
</script>


<div class="flex h-screen w-screen absolute top-0 left-0">
  <div class="m-auto">
    <div id="svg mb-2">
      <svg version="1.1" class="w-24 h-24 m-auto" id="L6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
        <rect fill="none" class="stroke-sky-500" stroke-width="4" x="25" y="25" width="50" height="50">
          <animateTransform
            attributeName="transform"
            dur="0.5s"
            from="0 50 50"
            to="180 50 50"
            type="rotate"
            id="strokeBox"
            attributeType="XML"
            begin="rectBox.end"/>
          </rect>
          <rect x="27" y="27" class="fill-sky-500" width="46" height="50">
          <animate
            attributeName="height"
            dur="1.3s"
            attributeType="XML"
            from="50" 
            to="0"
            id="rectBox" 
            fill="freeze"
            begin="0s;strokeBox.end"/>
        </rect>
      </svg>
    </div>
    {#if a}
    <div class="text-center font-serif text-slate-700 text-2xl h-8" 
      in:typeWriter={{speed: 1.8}}
      out:typeWriter|local={{delay: 1500, speed:1.5}}
      on:introend={() => {a = false;}}
      on:outroend={() => {a = true; phrase = getRandomPhrase()}}
      >
      {phrase}
    </div>
    {/if}
  </div>
</div>

<style>
  svg {
    animation: bounce 3s infinite;
  }
  #svg {
    animation: grow 5s infinite;
  }
   @keyframes bounce {
    0% {transform: translateY(0);}
    50% {transform: translateY(-4rem);}
    100% {transform: translateY(0);}
  }

  @keyframes grow {
    0% {transform: scale(1);}
    35% {transform: scale(1.7);}
    50% {transform: scale(2);}
    90% {transform: scale(1.1);}
    100% {transform: scale(1);}
  }

</style>