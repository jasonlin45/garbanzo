module.exports = {
  darkMode: 'class',
  content: ["./public/index.html", "./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Roboto',  'Segoe UI', 'Oxygen', 'Ubuntu',
        'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
        'serif': ['Roboto Slab', 'serif']
      },
    },
  },
  plugins: [],
}
