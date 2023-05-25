const fetchData = async (serchTerm) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "792f921e",
      s: serchTerm,
    },
  });
  if (await response.data.Error) {
    return [];
  }
  return await response.data.Search;
};

const deBounce = (callBack, delay = 1000) => {
  let timeOutId;
  return (...argument) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      callBack.apply(null, argument);
    }, delay);
  };
};

const onMovieSelect = async (movieId) => {
  const response = await axios.get("http://www.omdbapi.com/", {
    params: {
      apikey: "792f921e",
      i: movieId,
    },
  });

  if (await response.data.Error) {
    return [];
  }
  return await response.data;
};
const movieTemplate = (movieDetail) => {
  return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
    <article>
        <p class="title">${movieDetail.Awards}</p>
        <p class="subtitle">Awards</p>
    </article>
        <p class="title">${movieDetail.BoxOffice}</p>
        <p class="subtitle">Box Office</p>
    </article>
        <p class="title">${movieDetail.Metascore}</p>
        <p class="subtitle">Metascore</p>
    </article>
        <p class="title">${movieDetail.imdbRating}</p>
        <p class="subtitle">IMDB Ratting</p>
    </article>
        <p class="title">${movieDetail.imdbVotes}</p>
        <p class="subtitle">IMDB Votes</p>
    </article>
    `;
};
// document.addEventListener("click", (event) => {
//   if (!root.contains(event.target)) {
//     dropdown.classList.remove("is-active");
//   }
// });
