<script>
	import Router from 'svelte-spa-router';
	import DarkModeToggler from './components/DarkModeToggler.svelte';
	import { routes } from './routes';
	import {location} from 'svelte-spa-router';

	let paths = [
		{path: '/', name: 'Create'}, 
		{path: '/upload', name: 'Upload'},
		{path: '/gallery', name: 'Gallery'},
	];

	let dark;
	if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
		dark = true;
	}
	else dark = false;
</script>

<div class={dark ? "dark" : ""}>
	<main class="w-full h-screen dark:bg-slate-800 dark:text-white transition">
		<ul class="flex text-lg absolute p-2 gap-2 px-20 justify-center w-full">
			{#each paths as route}
				<li class="rounded-full p-1 px-2 transition
					{$location === route.path ? 
					"bg-sky-500 text-white": "text-black dark:text-white hover:bg-sky-100 dark:hover:bg-sky-800"}">
					<a href="#{route.path}">{route.name}</a>
				</li>
			{/each}
		</ul>
		<div class="absolute top-2 right-2">
			<DarkModeToggler bind:checked={dark}></DarkModeToggler>
		</div>
		<Router {routes}/>
	</main>
</div>

<style lang="postcss" global>
	@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100;200;300;400;500;600;700;800;900&display=swap");
	@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>