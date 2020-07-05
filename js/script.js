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

    //SEND FORM DATA via SMTPJS.COM
    var form = document.querySelector(".form");
    form.addEventListener("submit", function(event) {
        //prepare data for email
        var data = {};
        var file;
        Array.from(form.elements).forEach(function(elem) {
            data[elem.name] = elem.value;
            if (elem.name === "jobdesc-file") {
                file = elem.files[0];
            }
        });
        //prepare email content
        var emailSubject = data.name + " from " + data.company;
        var emailBody = "<html><h3>Name: " +
            data.name +
            "</h3><h3>Company: " +
            data.company +
            "</h3><h4>Email: " +
            data.email +
            "</h4><p>Job description: " +
            data.jobdesc +
            "</p></html>";
        //send email
        if (file) {
            readFileData(file)
                .then(function(result) {
                    Email.send({
                        SecureToken: "19a97c53-3b33-4261-bce0-354578209dbd",
                        To: 'what.s.web4you@gmail.com',
                        From: data.email,
                        Subject: emailSubject,
                        Body: emailBody,
                        Attachments: [{
                            name: file.name,
                            data: result
                        }]
                    });
                });
        } else Email.send({
            SecureToken: "19a97c53-3b33-4261-bce0-354578209dbd",
            To: 'what.s.web4you@gmail.com',
            From: data.email,
            Subject: emailSubject,
            Body: emailBody
        });
        event.preventDefault();
    });
}

function readFileData(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.addEventListener("load", function() { return resolve(reader.result); });
        reader.addEventListener("error", function() { return reject(reader.error); });
        reader.readAsDataURL(file);
    });
}