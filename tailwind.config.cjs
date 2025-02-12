module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple': '#A073B0',
        'custom-blue': '#3B82F6',
        'custom-orange': '#EF9629',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
};
