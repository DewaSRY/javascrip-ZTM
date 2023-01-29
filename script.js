const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loaderAnimation = document.getElementById("loader");
// Get Quotes from api
let apiQuotes = [];
// newQuote
function newQuote() {
  // pick a random quote from apiQuotes array
  const randomIndex = Math.floor(Math.random() * apiQuotes.length);
  const quote = apiQuotes[randomIndex];
  authorText.textContent = quote.author === null ? quote.tag : quote.author;
  quoteText.textContent = quote.text;
  quote.text.length > 35
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  complite();
}
// get getQuotes
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //
    getQuotes();
    console.log("somthing wrong", error);
  }
}
// Tweet Quote
function tweetQuote() {
  //
  const tweetApiUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetApiUrl, "_blank");
}
// loading animation
function complite() {
  loaderAnimation.hidden = true;
  quoteContainer.hidden = false;
}
function loading() {
  loaderAnimation.hidden = false;
  quoteContainer.hidden = true;
}

// on load
getQuotes();
// listen
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", getQuotes);
