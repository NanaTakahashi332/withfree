window.addEventListener("load", () => {
  const targets = document.querySelectorAll(
    ".fadeUpTrigger, .fadeLeftTrigger, .fadeRightTrigger"
  );
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;

        const el = e.target;
        if (el.classList.contains("fadeUpTrigger")) el.classList.add("fadeUp");
        if (el.classList.contains("fadeLeftTrigger")) el.classList.add("fadeLeft");
        if (el.classList.contains("fadeRightTrigger")) el.classList.add("fadeRight");

        io.unobserve(el);
      }
    },
    {
      threshold: 0.25,
    }
  );

  targets.forEach((t) => io.observe(t));
});