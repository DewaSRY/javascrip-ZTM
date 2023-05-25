const createAutoComplite = ({
  root,
  summary,
  renderOption,
  onOptionSelect,
}) => {
  root.innerHTML = `
<lebel><b>Search For a Movie</b></lebel>
<input class="input"/>
<div class="dropdown">
    <div class="dropdown-menu">
        <div class="dropdown-content results">
        </div>
    </div>
</div>
`;

  const input = root.querySelector(" input");
  const dropdown = root.querySelector(".dropdown");
  const resultWrapper = root.querySelector(".results");

  const onInput = async (event) => {
    const inputTOSerch = event.target.value;
    if (!inputTOSerch.length) {
      setTimeout(() => {
        dropdown.classList.remove("is-active");
      }, 1000);
    } else {
      const movies = await fetchData(inputTOSerch);
      dropdown.classList.add("is-active");
      for (let movie of movies) {
        const anchorOption = document.createElement("a");
        anchorOption.innerHTML = "";
        anchorOption.classList.add("dropdown-item");
        anchorOption.innerHTML = renderOption(movie);
        anchorOption.addEventListener("click", () => {
          getMovieDetail(movie.imdbID);
          input.value = movie.Title;
        });
        resultWrapper.appendChild(anchorOption);
      }
    }
  };
  const movieSummary = summary;

  const getMovieDetail = async (movieId) => {
    dropdown.classList.remove("is-active");
    const movieDetails = await onOptionSelect(movieId);
    movieSummary.innerHTML = movieTemplate(movieDetails);
  };
  input.addEventListener("input", deBounce(onInput));
};
