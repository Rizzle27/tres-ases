if (document.getElementById("carousel")) {
  let clickedSlide = false;
  function setActiveSlide(index) {
    const slides = document.querySelectorAll(".slide");

    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    clickedSlide = true;
  }

  function changeSlideAutomatically() {
    const slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      if (!clickedSlide) {
        slides[currentIndex].classList.remove("active");
        currentIndex = (currentIndex + 1) % slides.length;
        slides[currentIndex].classList.add("active");
      } else {
        clearInterval(intervalId);
      }
    }, 5000);
  }

  changeSlideAutomatically();
  if (document.getElementById("carousel")) {
  }
}
