  document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle?.querySelector('i');
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('back-to-top');
    
    // 1. DARK MODE + LOCALSTORAGE
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    icon.className = savedTheme === 'light' ? 'bi bi-moon' : 'bi bi-sun';
    
    themeToggle?.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        icon.className = newTheme === 'light' ? 'bi bi-moon' : 'bi bi-sun';
    });
    
    // 2. NAVBAR + BACK TO TOP - 1 SEUL SCROLL
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        navbar?.classList.toggle('navbar-scrolled', scrollY > 50);
        backToTop?.classList.toggle('show', scrollY > 300);
    });
    
    backToTop?.addEventListener('click', () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});