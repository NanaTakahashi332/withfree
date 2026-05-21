document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".top-casestudies_wrapper");
  const prevButton = document.querySelector(".top-casestudies_wrapper_control_prev");
  const nextButton = document.querySelector(".top-casestudies_wrapper_control_next");

  if (!wrapper || !prevButton || !nextButton) {
    return;
  }

  prevButton.addEventListener("click", () => {
    wrapper.style.setProperty("--case-slider-direction", "reverse");
  });

  nextButton.addEventListener("click", () => {
    wrapper.style.setProperty("--case-slider-direction", "normal");
  });
});
