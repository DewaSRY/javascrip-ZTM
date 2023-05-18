const toggleSwitch = document.querySelector("input[type='checkbox']");

const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");
//Dark Mode Style
function darkMode() {
  nav.style.backgroundColor = "rgb(0 0 0/50%)";
  textBox.style.backgroundColor = "rgb(255 255 255/50%)";
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.remove("fa-sun");
  toggleIcon.children[1].classList.add("fa-moon");
  image1.src = "img/undraw_conceptual_idea_dark.svg";
  image2.src = "img/undraw_feeling_proud_dark.svg";
  image3.src = "img/undraw_proud_coder_dark.svg";
}
function lightMode() {
  textBox.style.backgroundColor = "rgb(0 0 0/50%)";
  nav.style.backgroundColor = "rgb(255 255 255/50%)";
  toggleIcon.children[0].textContent = "Light Mode";
  toggleIcon.children[1].classList.add("fa-sun");
  toggleIcon.children[1].classList.remove("fa-moon");
  image1.src = "img/undraw_conceptual_idea_light.svg";
  image2.src = "img/undraw_feeling_proud_light.svg";
  image3.src = "img/undraw_proud_coder_light.svg";
}
//
function toggleMode(choseDarkMode) {
  console.log(choseDarkMode);
  nav.style.backgroundColor = choseDarkMode
    ? "rgb(0 0 0/50%)"
    : "rgb(255 255 255/50%)";
  textBox.style.backgroundColor = choseDarkMode
    ? "rgb(255 255 255/50%)"
    : "rgb(0 0 0/50%)";
  toggleIcon.children[0].textContent = choseDarkMode
    ? "Dark Mode"
    : "Light Mode";
  toggleIcon.children[1].classList.remove(choseDarkMode ? "fa-sun" : "fa-moon");
  toggleIcon.children[1].classList.add(choseDarkMode ? "fa-moon" : "fa-sun");
  image1.src = `img/undraw_conceptual_idea_${
    choseDarkMode ? "dark" : "light"
  }.svg`;
  image2.src = `img/undraw_feeling_proud_${
    choseDarkMode ? "dark" : "light"
  }.svg`;
  image3.src = `img/undraw_proud_coder_${choseDarkMode ? "dark" : "light"}.svg`;
}
//Switch Theme Dynamically
function switchTheme(event) {
  const choseDarkMode = event.target.checked;
  if (event.target.checked) {
    toggleMode(choseDarkMode);
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    toggleMode(choseDarkMode);
    localStorage.setItem("theme", "light");
    document.documentElement.removeAttribute("data-theme", "dark");
  }
}

//Event Listener
toggleSwitch.addEventListener("change", switchTheme);
//Check Local Storage
const currentThemeIsDark = localStorage.getItem("theme") === "dark";
console.log(currentThemeIsDark);
toggleSwitch.checked = currentThemeIsDark;
toggleMode(currentThemeIsDark);
