import Home from './routes/Home.svelte';
import Gallery from './routes/Gallery.svelte';
import Upload from './routes/Upload.svelte';

export const routes = {
    '/': Home,
    '/gallery': Gallery,
    '/upload': Upload,
    '/*': Home,
}