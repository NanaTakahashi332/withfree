window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  if (!loading) return;

  setTimeout(() => {
    loading.classList.add("is-hidden");
  }, 1000); // ← 1秒
});