document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const prevBtn = document.querySelector(".gallery-btn.prev");
  const nextBtn = document.querySelector(".gallery-btn.next");

  if (!mainImage || thumbnails.length === 0) return;

  let currentIndex = 0;

  function showImage(index) {
    if (index < 0) index = thumbnails.length - 1;
    if (index >= thumbnails.length) index = 0;

    const newSrc = thumbnails[index].src;
    mainImage.style.opacity = 0;
    setTimeout(() => {
      mainImage.src = newSrc;
      mainImage.style.opacity = 1;
    }, 300);

    thumbnails.forEach(t => t.classList.remove("active"));
    thumbnails[index].classList.add("active");
    currentIndex = index;
  }

  thumbnails.forEach((thumb, idx) => {
    thumb.addEventListener("click", () => showImage(idx));
  });

  prevBtn?.addEventListener("click", () => showImage(currentIndex - 1));
  nextBtn?.addEventListener("click", () => showImage(currentIndex + 1));
});
