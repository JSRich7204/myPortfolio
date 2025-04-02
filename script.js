const message = ["Hi, I'm Janiya Richardson!"] 
const speed = 50
let textPosition = 0;

function typewriter() {
    document.querySelector("#welcome").innerHTML = message[0].substring(0, textPosition) + '<span>\u25AE</span>'
    if(textPosition++ != message[0].length)
      setTimeout(typewriter, speed)
  }
  
  window.addEventListener("load", typewriter)

function toggleMenu() {
    const navLinks = document.getElementById("navLinks");
    navLinks.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const wrapper = document.querySelector(".wrapper");

  const firstCard = carousel.querySelector(".card");
  const firstCardWidth = firstCard.offsetWidth;

  let isDragging = false,
      startX,
      startScrollLeft,
      timeoutId;

  const dragStart = (e) => { 
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX;
      startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
      if (!isDragging) return;
  
      // Calculate the new scroll position
      const newScrollLeft = startScrollLeft - (e.pageX - startX);
  
      // Check if the new scroll position exceeds 
      // the carousel boundaries
      if (newScrollLeft <= 0 || newScrollLeft >= 
          carousel.scrollWidth - carousel.offsetWidth) {
          
          // If so, prevent further dragging
          isDragging = false;
          return;
      }
  
      // Otherwise, update the scroll position of the carousel
      carousel.scrollLeft = newScrollLeft;
  };

  const dragStop = () => {
      isDragging = false; 
      carousel.classList.remove("dragging");
  };

  const autoPlay = () => {
  
      // Return if window is smaller than 800
      if (window.innerWidth < 800) return; 
      
      // Calculate the total width of all cards
      const totalCardWidth = carousel.scrollWidth;
      
      // Calculate the maximum scroll position
      const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
      
      // If the carousel is at the end, stop autoplay
      if (carousel.scrollLeft >= maxScrollLeft) return;
      
      // Autoplay the carousel after every 2500ms
      timeoutId = setTimeout(() => 
          carousel.scrollLeft += firstCardWidth, 2500);
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  wrapper.addEventListener("mouseenter", () => 
      clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  // Add event listeners for the arrow buttons to 
  // scroll the carousel left and right
  arrowBtns.forEach(btn => {
      btn.addEventListener("click", () => {
          carousel.scrollLeft += btn.id === "left" ? 
              -firstCardWidth : firstCardWidth;
      });
  });
});

let slideIndex = 0;

// Function to show slides
function showSlides() {
  let i;
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove the "active" class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Increment the slide index
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1; // Wrap around to the first slide
  }

  // Show the current slide and highlight the corresponding dot
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  // Automatically move to the next slide after 20 seconds
  setTimeout(showSlides, 20000);
}

// Function to manually navigate to the next/previous slide
function plusSlides(n) {
  slideIndex += n - 1; // Adjust the index for manual navigation
  showSlides();
}

// Function to manually navigate to a specific slide
function currentSlide(n) {
  slideIndex = n - 1; // Adjust the index for manual navigation
  showSlides();
}

// Start the slideshow when the page loads
window.onload = function () {
  showSlides();
};