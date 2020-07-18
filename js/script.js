//CURRENT YEAR RENDERING IN THE FOOTER
var copyrightParag = document.querySelector(".footer__copyright-text");
copyrightParag.insertAdjacentText('beforeend', new Date().getFullYear());

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

//SHOW SELECTED FILENAME BELOW THE UPLOAD FILE BTN
var fileInput = document.querySelector(".form__file-input");
var filenameLabel = document.querySelector(".form__file-name");
fileInput.addEventListener("change", function(event) {
    if (fileInput.files.length > 0) {
        var filename = fileInput.files[0].name;
        if (filename.length > 40) filename = "..." + filename.slice(-40);
        filenameLabel.textContent = ".../" + filename;
    } else filenameLabel.textContent = "";
});

//TEXTAREA CLOSE BTN HANDLER
var textCheckbox = document.querySelector(".form__textarea-checkbox");
var textCloseBtn = document.querySelector(".form__textarea-close-btn");
textCloseBtn.addEventListener("click", function(event) {
    textCheckbox.checked = false;
});

//SEND FORM DATA via SMTPJS.COM
var form = document.querySelector(".form");
var spinnerCheckbox = document.querySelector(".spinner__checkbox");
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
    //clear form fields
    Array.from(form.elements).forEach(function(elem) {
        elem.value = "";
    });
    filenameLabel.textContent = "";
    //prepare email content
    var email = createEmail(data);
    //send email
    if (file) {
        spinnerCheckbox.checked = true;
        readFileData(file)
            .then(function(result) {
                Email.send({
                        SecureToken: "19a97c53-3b33-4261-bce0-354578209dbd",
                        To: 'project-lead@antenna-recruiting.com',
                        From: email.from,
                        Subject: email.subject,
                        Body: email.body,
                        Attachments: [{
                            name: file.name,
                            data: result
                        }]
                    }).then(function(message) {
                        spinnerCheckbox.checked = false;
                        if (message === "OK") {
                            window.location.hash = "#popup";
                        } else window.location.hash = "#popup-failure";
                    })
                    .catch(function(error) {
                        spinnerCheckbox.checked = false;
                        window.location.hash = "#popup-failure";
                        console.log(error);
                    });
            })
            .catch(function(error) {
                spinnerCheckbox.checked = false;
                window.location.hash = "#popup-failure";
                console.log(error);
            });
    } else Email.send({
            SecureToken: "19a97c53-3b33-4261-bce0-354578209dbd",
            To: 'project-lead@antenna-recruiting.com',
            From: email.from,
            Subject: email.subject,
            Body: email.body
        }).then(function(message) {
            spinnerCheckbox.checked = false;
            if (message === "OK") {
                window.location.hash = "#popup";
            } else window.location.hash = "#popup-failure";
        })
        .catch(function(error) {
            spinnerCheckbox.checked = false;
            console.log(error);
        });
    event.preventDefault();
});

//prepare email content
function createEmail(data) {
    var subject = data.name + " from " + data.company;
    var body = "<html><h3>Name: " +
        data.name +
        "</h3><h3>Company: " +
        data.company +
        "</h3><h4>Email: " +
        data.email +
        "</h4><p>Job description: " +
        data.jobdesc +
        "</p></html>";
    return { from: data.email, subject: subject, body: body };
}

function readFileData(file) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.addEventListener("load", function() { return resolve(reader.result); });
        reader.addEventListener("error", function() { return reject(reader.error); });
        reader.readAsDataURL(file);
    });
}

//close popup with side click
var popupElem = document.querySelector(".popup");
popupElem.addEventListener("click", function(event) {
    if (event.target.matches(".popup")) {
        window.location.hash = "#";
    }
});

//close popup-failure with side click
var popupFailElem = document.querySelector(".popup-failure");
popupFailElem.addEventListener("click", function(event) {
    if (event.target.matches(".popup-failure")) {
        window.location.hash = "#section-submit-job";
    }
});

//FOOTER PHONE NUMBER COPY TO CLIPBOARD ON CLICK
var linkElems = document.querySelectorAll(".footer__link");
Array.from(linkElems).forEach(function(elem) {
    elem.addEventListener("click", function(event) {
        var textElem = document.createElement('textarea');
        textElem.value = event.target.textContent;
        textElem.setAttribute('readonly', '');
        textElem.style.position = 'absolute';
        textElem.style.left = '-9999px';
        document.body.appendChild(textElem);
        textElem.select();
        document.execCommand('copy');
        document.body.removeChild(textElem);
    });
});