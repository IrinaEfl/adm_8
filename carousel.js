const carouselData = [
  {
    imgSrc: "images/v368_430.png",
    alt: "partner1",
    title: "Tacoland",
    rating: "5.0",
    reviews: 203
  },
  {
    imgSrc: "images/v368_428.png",
    alt: "partner2",
    title: "Tokyo City",
    rating: "4.9",
    reviews: 188
  },
  {
    imgSrc: "images/v368_435.png",
    alt: "partner3",
    title: "Зодиак",
    rating: "4.8",
    reviews: 175
  }
];

let currentIndex = 0;
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let interval;
let startX = 0;

/* ============================= */
/* RENDER */
/* ============================= */

function renderCarousel() {
  if (!track) return;

  track.style.opacity = 0;

  setTimeout(()=>{

    track.innerHTML = '';

    const prevIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
    const nextIndex = (currentIndex + 1) % carouselData.length;

    const slides = [
      { index: prevIndex, isActive: false },
      { index: currentIndex, isActive: true },
      { index: nextIndex, isActive: false }
    ];

    slides.forEach(slide => {

      const data = carouselData[slide.index];

      const slideDiv = document.createElement('div');

      slideDiv.className = `carousel-slide ${slide.isActive ? 'active' : ''}`;

      slideDiv.innerHTML = `
        <img src="${data.imgSrc}" alt="${data.alt}">
        <div class="slide-caption">
          <span>${data.title}</span>
          <span>★ ${data.rating} (${data.reviews})</span>
        </div>
      `;

      track.appendChild(slideDiv);

    });

    track.style.opacity = 1;

  },200);
}



function nextSlide() {

  currentIndex = (currentIndex + 1) % carouselData.length;

  renderCarousel();

}

function prevSlide() {

  currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;

  renderCarousel();

}



function startAutoPlay() {

  if (interval) clearInterval(interval);

  interval = setInterval(nextSlide,3000);

}

function stopAutoPlay() {

  clearInterval(interval);

}



function animateButton(btn){

  btn.style.transform="scale(0.8)";

  setTimeout(()=>{
    btn.style.transform="scale(1)";
  },150)

}



function initSwipe(){

  track.addEventListener("touchstart",(e)=>{

    startX = e.touches[0].clientX;

  });

  track.addEventListener("touchend",(e)=>{

    let endX = e.changedTouches[0].clientX;

    if(startX - endX > 50){
      nextSlide();
    }

    if(endX - startX > 50){
      prevSlide();
    }

  });

}



document.addEventListener('DOMContentLoaded', function() {

  if (prevBtn && nextBtn && track) {

    prevBtn.addEventListener('click', () => {

      animateButton(prevBtn);

      stopAutoPlay();
      prevSlide();
      startAutoPlay();

    });

    nextBtn.addEventListener('click', () => {

      animateButton(nextBtn);

      stopAutoPlay();
      nextSlide();
      startAutoPlay();

    });

    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);

    initSwipe();

    renderCarousel();
    startAutoPlay();

  }

});