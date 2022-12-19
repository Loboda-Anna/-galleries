import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGallery(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGallery(imgs) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join("");
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const createdModalImg = basicLightbox.create(
    `
      <img src="${evt.target.dataset.source}" alt="${evt.target.alt}" width="800" height="600">
  `,
    {
      onShow: (createdModalImg) => {
        document.addEventListener("keydown", onEscKeyDown);
      },
      onClose: (createdModalImg) => {
        document.removeEventListener("keydown", onEscKeyDown);
      },
    }
  );
  createdModalImg.show();

  function onEscKeyDown(evt) {
    if (evt.code === "Escape") {
      createdModalImg.close();
    }
  }
}
