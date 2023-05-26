const input = document.querySelector("#message-input");
const link = document.querySelector("#link-input");
const { hash } = window.location;
console.log(hash);
if (hash) {
  document.getElementById("your-message").innerHTML = atob(
    hash.replace("#", "")
  );
  document.querySelector("#message-show").classList.remove("hide");
  document.querySelector("#link-form").classList.add("hide");
  document.querySelector("#message-form").classList.add("hide");
} else {
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const encrypted = btoa(input.value);
    document.querySelector("#message-form").classList.add("hide");
    document.querySelector("#link-form").classList.remove("hide");
    link.value = `${window.location}#${encrypted}`;
    console.log(input.value);
    link.select();
  });
}
