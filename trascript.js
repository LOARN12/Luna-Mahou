function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Reset active nav buttons
    document.querySelectorAll('.navbar button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Highlight clicked button
    event.target.classList.add('active');
}

// Open the correct modal
document.querySelectorAll('.open-modal').forEach(button => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal-target');
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
  });
});

// Close the modal when "Close" button is clicked
document.querySelectorAll('.close-modal').forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    if (modal) modal.classList.remove('open');
  });
});

const slide = document.getElementById("carouselSlide");
const images = slide.querySelectorAll("img");
const totalSlides = images.length;
let currentIndex = 1; // Start from real first image

// Set initial position
slide.style.transform = `translateX(-${currentIndex * 100}%)`;

function moveSlide(direction) {
  if (direction !== 0) {
    currentIndex += direction;
    slide.style.transition = "transform 0.5s ease-in-out";
    slide.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
}

// Reset position when hitting clones
slide.addEventListener("transitionend", () => {
  if (images[currentIndex].alt === "Clone First") {
    slide.style.transition = "none";
    currentIndex = 1;
    slide.style.transform = `translateX(-${currentIndex * 100}%)`;
  } else if (images[currentIndex].alt === "Clone Last") {
    slide.style.transition = "none";
    currentIndex = totalSlides - 2;
    slide.style.transform = `translateX(-${currentIndex * 100}%)`;
  }
});

// Auto-slide
setInterval(() => {
  moveSlide(1);
}, 3000);
