document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');
    const cardWidth = 175; // Card width + gap
    
    // Navigation buttons functionality
    leftBtn.addEventListener('click', function() {
        gallery.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    
    rightBtn.addEventListener('click', function() {
        gallery.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
    
    // Touch support for mobile devices
    let startX;
    let scrollLeft;
    let isDown = false;
    
    gallery.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
    });
    
    gallery.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    gallery.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    gallery.addEventListener('mousemove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.pageX - gallery.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-fast
        gallery.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events
    gallery.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - gallery.offsetLeft;
        scrollLeft = gallery.scrollLeft;
    });
    
    gallery.addEventListener('touchend', () => {
        isDown = false;
    });
    
    gallery.addEventListener('touchmove', (e) => {
        if(!isDown) return;
        const x = e.touches[0].pageX - gallery.offsetLeft;
        const walk = (x - startX) * 2;
        gallery.scrollLeft = scrollLeft - walk;
    });
    
    // Hide/show buttons based on scroll position
    function checkScroll() {
        leftBtn.style.visibility = gallery.scrollLeft > 0 ? 'visible' : 'hidden';
        rightBtn.style.visibility = gallery.scrollLeft < (gallery.scrollWidth - gallery.clientWidth) ? 'visible' : 'hidden';
    }
    
    gallery.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll(); // Initial check
});