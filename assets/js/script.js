const toggleBtn = document.querySelector("#theme-toggle");

toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
});
