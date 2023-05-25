const autoComliteOption = {
  renderOption: (movie) => {
    const imageSrc = movie.Poster === "N/A" ? " " : movie.Poster;
    return `
          <img src="${imageSrc}"/>
          <p>${movie.Title} (${movie.Year})</p>
          `;
  },
  onOptionSelect: (movie) => {
    document.querySelector(".tutorial").classList.add("is-hidden");
    return onMovieSelect(movie);
  },
};

createAutoComplite({
  ...autoComliteOption,
  root: document.getElementById("left-autocomplete"),
  summary: document.getElementById("left-summary"),
});
createAutoComplite({
  ...autoComliteOption,
  root: document.getElementById("right-autocomplete"),
  summary: document.getElementById("right-summary"),
});
