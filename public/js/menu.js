const toggle_menu = document.querySelector(".toggle-menu");
const nav_menu = document.querySelector(".menu");

toggle_menu.addEventListener("click", () => {
    toggle_menu.classList.toggle("active");
    nav_menu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    toggle_menu.classList.remove("active");
    nav_menu.classList.remove("active");
}))