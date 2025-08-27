// -------------------- Gobstone Interactions --------------------
const GobstoneGame = (() => {
    const outcomes = [
        "You won! Your opponent got squirted with smelly gobstone liquid!",
        "Oh no! You lost and got a face full of stinky liquid!",
        "Great shot! You knocked out three gobstones in one turn!",
        "It's a tie! Both players got squirted this time!",
        "Amazing! You pulled off a legendary gobstone move!",
        "Yuck! The gobstone liquid smells like rotten eggs today!"
    ];

    const facts = [
        "Gobstones was first mentioned in 'Harry Potter and the Philosopher's Stone'!",
        "The game is similar to the Muggle game of marbles, but with a magical twist!",
        "There's a Gobstone Club at Hogwarts School of Witchcraft and Wizardry!",
        "Professional Gobstone players exist in the wizarding world!",
        "The liquid that squirts from gobstones smells absolutely terrible!",
        "Gobstones is considered one of the most popular wizarding games!"
    ];

    const messageElement = document.getElementById('game-message');

    function clickGobstone(stone) {
        stone.style.transform = 'scale(1.2) rotate(360deg)';
        stone.style.background = 'radial-gradient(circle at 30% 30%, #FF6B6B, #FF8E53, #8B7355)';
        setTimeout(() => {
            stone.style.transform = 'scale(1)';
            stone.style.background = 'radial-gradient(circle at 30% 30%, #FFD700, #B8860B, #8B7355)';
        }, 500);
    }

    function playGame() {
        const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        messageElement.innerHTML = randomOutcome;
    }

    function learnFact() {
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        messageElement.innerHTML = randomFact;
    }

    return { clickGobstone, playGame, learnFact };
})();

// -------------------- Make functions globally accessible --------------------
window.clickGobstone = GobstoneGame.clickGobstone;
window.playGame = GobstoneGame.playGame;
window.learnFact = GobstoneGame.learnFact;


// -------------------- Sparkle Effect --------------------
const Sparkles = (() => {
    const sparkleTypes = ['✨', '⭐', '🌟', '💫', '❄️', '🔥', '🌠', '💥', '🌈', '🪐', '⚡'];

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = '0px';
        sparkle.style.fontSize = (10 + Math.random() * 20) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = `fall ${2 + Math.random()*2}s linear forwards`;
        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 3000);
    }

    function init() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
              0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) translateX(50px) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        setInterval(createSparkle, 1000);
    }

    return { init };
})();

// -------------------- Photo Carousel --------------------
class PhotoCarousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');
        this.counter = container.querySelector('.carousel-counter');
        this.indicators = container.querySelectorAll('.indicator');
        this.slides = container.querySelectorAll('.carousel-slide');

        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isTransitioning = false;

        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        this.startAutoPlay();

        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });

        this.addSwipeSupport();
        this.updateCarousel();
    }

    updateCarousel() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        this.counter.textContent = `${this.currentSlide + 1} / ${this.totalSlides}`;

        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });

        setTimeout(() => this.isTransitioning = false, 500);
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    prevSlide() {
        this.currentSlide = this.currentSlide === 0 ? this.totalSlides - 1 : this.currentSlide - 1;
        this.updateCarousel();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 4000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    addSwipeSupport() {
        let startX = 0, startY = 0, endX = 0, endY = 0;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        this.track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;

            const deltaX = endX - startX;
            const deltaY = endY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                deltaX > 0 ? this.prevSlide() : this.nextSlide();
            }
        });
    }
}

// -------------------- Initialize --------------------
document.addEventListener('DOMContentLoaded', () => {
    Sparkles.init();

    // Multiple carousels support
    document.querySelectorAll('.carousel-container').forEach(container => {
        new PhotoCarousel(container);
    });
});
