
const header = document.getElementById('header');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 750) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
});