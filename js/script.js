window.onload = function() {
    const navCheckbox = document.querySelector(".navigation__checkbox");
    const navList = document.querySelector(".navigation__list");

    navList.addEventListener("click", function(event) {
        navCheckbox.checked = false;
    });
}