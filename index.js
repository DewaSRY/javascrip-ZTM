const imageContainer = document.getElementById("image-container");
const loadder = document.getElementById("loadder");
const Client_id = "Jw3G2Vx4vAuKLaMKXvx9E3AmHP6qU3qCr8RjzWGHuOw";
const count = 10;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${Client_id}&count=${count}`;
//Unsplash Api
let ready = false;
let imagesHaveLoadded = 0;
let totalImages = 0;
let photoArray = [];
//Create Elements for links & Photos add to DOM
function setAttributs(Elements, attributs) {
  for (const key in attributs) [Elements.setAttribute(key, attributs[key])];
}
//Check if all images were loadded
function imagesLoadded() {
  console.log("image", imagesHaveLoadded);
  imagesHaveLoadded++;
  if (imagesHaveLoadded === totalImages) {
    loadder.classList.add("hidden");
    ready = true;
    console.log("readey=", ready);
  }
}
function displayPhoto() {
  imagesHaveLoadded = 0;
  totalImages = photoArray.length;
  photoArray.forEach((photo) => {
    //Create <a> to Link to Unsplash
    const item = document.createElement("a");
    const img = document.createElement("img");
    setAttributs(item, {
      href: photo.links.html,
      target: "_blank",
    });
    setAttributs(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imagesLoadded);
    //Put <img> inside <a>, then put both inside Image Container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
//get Photos from Unsplas api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    photoArray.push(...data);
    displayPhoto();
  } catch (err) {
    console.log(err);
  }
}
//Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    loadder.classList.remove("hidden");
    ready = false;
    getPhotos();
  }
});
//On Load
getPhotos();
