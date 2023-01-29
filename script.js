const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
//
let ready = false;
let imagesLoaded = 0;
let totalImage = 0;
let photoArray = [];
//Api
const YOUR_ACCESS_KEY = `v2SqFi-a1M6rNzU7314v-mO-yl91Py36MktXT2iVeqY`;
const Secret_key = `FIh3eCmF0wAagk1tjJi8lGEnp5Bb-nLjp92b3QcrOPQ`;
let count = 5;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${YOUR_ACCESS_KEY}&count=${count}`;
// Helper Function to set Atribut
function setAttributs(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// display phot
function displayPhoto() {
  photoArray.forEach((photo) => {
    imagesLoaded = 0;
    totalImage = photoArray.length;
    // console.log("total image", totalImage);
    // crete a link to uspas
    const item = document.createElement("a");
    /*
    item.setAttribute("herf", photo.links.html);
    item.setAttribute("target", "_blank");
    */
    setAttributs(item, {
      herf: photo.links.html,
      target: "_blank",
    });
    // Create emage for photo
    const img = document.createElement("img");
    /*
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);
    */

    setAttributs(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Evwnt listener
    img.addEventListener("load", imageLoaded);
    // put img in itme and add it to container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// imageLoaded
function imageLoaded() {
  imagesLoaded++;
  //   console.log("image loaded", imagesLoaded);
  if (imagesLoaded === totalImage) {
    ready = true;
    loader.hidden = true;
    count = 10;
    // console.log("ready", ready);
  }
}

// Get photo
async function getPhoto() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    displayPhoto();
    // console.log(photoArray);
  } catch (error) {
    // console.log("sometinge was wrong", error);
  }
}
// Check see if scroling near bottom of page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    console.log("scroled");
    getPhoto();
    ready = false;
  }
});
// load
getPhoto();
