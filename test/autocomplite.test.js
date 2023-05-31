const waitFor = (selector) => {
  return new Promise((resolve, reject) => {
    const inetrval = setInterval(() => {
      if (document.querySelector(selector)) {
        clearInterval(inetrval);
        clearTimeout(timeOut);
        resolve();
      }
    }, 100);
    const timeOut = setTimeout(() => {
      reject();
    }, 2000);
  });
};
beforeEach(() => {
  document.querySelector("#target").innerHTML = "";
  createAutoComplete({
    root: document.querySelector("#target"),
    fetchData() {
      return [
        { Title: "Avengers" },
        { Title: "Not Avengers" },
        { Title: "Like Avengers" },
        { Title: "smae Avengers" },
        { Title: "it's Avengers" },
      ];
    },
    renderOption(movie) {
      return movie.Title;
    },
  });
});
it("Dropdown start close", () => {
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).not.to.include("is-active");
});
it("After searching , dropdown opens up", async () => {
  const input = document.querySelector("input");
  input.value = "Avengers";
  input.dispatchEvent(new Event("input"));
  await waitFor(".dropdown-item");
  const dropdown = document.querySelector(".dropdown");
  expect(dropdown.className).to.include("is-active");
});
it("After searching, displays some result", async () => {
  const input = document.querySelector("input");
  input.value = "Avengers";
  input.dispatchEvent(new Event("input"));
  await waitFor(".dropdown-item");
  const items = document.querySelectorAll(".dropdown-item");
  expect(items.length).to.equal(5);
});
