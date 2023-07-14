const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quotes");
const authorText = document.getElementById('author');
const twitterButton = document.getElementById("twitter-button");
const newQuoteBtn = document.getElementById('new-quotes');
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show new quotes
function newQuote() {
  //set loading function
  loading()
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Conditiona statement for Unknown Authors
  if(!quote.author){
    authorText.textContent = "Unknown";
  }else{
    authorText.textContent = quote.author;
  }
  

  //Check quote length to determine the quoteText font size.

  if(quote.text.length > 120){
    quoteText.classList.add("long-quote");
  }else{
    quoteText.classList.remove("long-quote");
  }
  // set Quote, Hide loader
  quoteText.textContent = quote.text;
  complete();
} 



// Get quotes from API

async function getQuotes(){
  loading();
   const apiLink = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
   try{
    const response = await fetch(apiLink);
    apiQuotes = await response.json();
    newQuote();
   }
   catch (error){
    "Try another time pele"
   }
}

function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  // to allow twitter open in a new tab
  window.open(twitterUrl, "_blank");  
}

function loading(){
loader.hidden = false;
quoteContainer.hidden = true;
}

function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}

newQuoteBtn.addEventListener("click", getQuotes);
twitterButton.addEventListener("click", tweetQuote);
getQuotes();
