const toggle = document.getElementById('dark-mode-toggle');
const html = document.documentElement;

if (localStorage.getItem('darkMode') === 'true') {
  html.classList.add('dark');
}

toggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('darkMode', html.classList.contains('dark'));
});
