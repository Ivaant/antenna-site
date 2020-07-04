window.onload = function() {
    //NAVIGATION HIDING AFTER CLICK
    var navCheckbox = document.querySelector(".navigation__checkbox");
    var navList = document.querySelector(".navigation__list");

    navList.addEventListener("click", function(event) {
        navCheckbox.checked = false;
    });

    //SCROLL ANIMATION

    //section-about Feature-Box moveInBottom
    var waypoint1 = new Waypoint({
        element: document.querySelector(".section-about"),
        handler: function(direction) {
            Array.from(document.querySelectorAll(".feature-box")).forEach(function(elem) {
                elem.classList.add("feature-box--animated");
            });
        }
    });

    //section-steps steps__image-box moveInBottom
    var waypoint2 = new Waypoint({
        element: document.querySelector(".section-steps"),
        handler: function(direction) {
            document.querySelector(".steps__image-box").classList.add("steps__image-box--animated");
        },
        offset: '150px;'
    });
}