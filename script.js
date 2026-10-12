const yogaClasses = [
    {
        id: "gentle",
        name: "Gentle Yoga",
        description: "A slower class that is good for beginneers or anyone who wants a relaxed pace.",
        schedule: "Monday 6:00 PM - 7:00 PM and Thursday 5:30 PM - 6:30 PM"
    },
    {
        id: "vinyasa",
        name: "Vinyasa Flow",
        description: "A more active class that connects movement with breathing.",
        schedule: "Tuesday 5:30 PM - 6:30 PM and Friday 6:00 PM - 7:00 PM"
    },
    {
        id: "restorative",
        name: "Restorative Yoga",
        description: "A quiet class that focused on supported poses and relaxation.",
        schedule: "Wednesday 6:00 PM - 7:00 PM"
    },
];

const errorIds = ["name-error", "email-error", "interest-error", "experience-error", "contact-error", "phone-error", "message-error"];

function findClass(classId) {
    for (let i=0; i < yogaClasses.length; i++) {
        if (yogaClasses[i].id === classId) {
            return yogaClasses[i];
        }
    }
    return null;
}

function showClassDetails(classId) {
    const result = document.getElementById("class-result");
    if (!result) return;

    result.innerHTML = ""; // Clear previous content
    const selectedClass = findClass(classId);
    if (!selectedClass) return;

    result.innerHTML =
        "<article>" +
        "<h3>" + selectedClass.name + "</h3>" +
        "<p>" + selectedClass.description + "</p>" +
        "<p><strong>Schedule:</strong> " + selectedClass.schedule + "</p>" +
        "</article>";
}

function setupClassFinder() {
    const classChoice = document.getElementById("class-choice");
    if (!classChoice) return;

    const savedClass = localStorage.getItem("riverbendClass");
    if (findClass(savedClass)) {
        classChoice.value = savedClass;
        showClassDetails(savedClass);
    }

    classChoice.addEventListener("change", function() {
        if (classChoice.value === "") {
            localStorage.removeItem("riverbendClass");
        } else {
            localStorage.setItem("riverbendClass", classChoice.value);
        }
        showClassDetails(classChoice.value);
    });
}

function restoreClassChoice() {
    const interest = document.getElementById("interest");
    if (!interest) return;

    const savedClass = localStorage.getItem("riverbendClass");
    if (!findClass(savedClass)) return;

    interest.value = savedClass;
}

function showError(id, text) {
    const errorElement = document.getElementById(id);
    if (errorElement) {
        errorElement.textContent = text;
    }
}

function clearErrors() {
    for (let i=0; i < errorIds.length; i++) {
        showError(errorIds[i], "");
    }
}

function validateFields() {
    clearErrors();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const interest = document.getElementById("interest").value;
    const experience = document.querySelector('input[name="experience"]:checked');
    const contactMethod = document.querySelector('input[name="contact-method"]:checked');
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    let valid = true;

    if (name.length < 2) {
        showError("name-error", "Please enter at least 2 characters for your name.");
        valid = false;
    }

    // We can add a regex to test the email format, but for simplicity, we'll just check for the presence of "@".
    if (!email.includes("@")) {
        showError("email-error", "Please enter a valid email address.");
        valid = false;
    }

    if (interest === "") {
        showError("interest-error", "Please select a class or event interest.");
        valid = false;
    }

    if (!experience) {
        showError("experience-error", "Please select your experience level.");
        valid = false;
    }

    if (!contactMethod) {
        showError("contact-error", "Please select a preferred contact method.");
        valid = false;
    }

    if (contactMethod && contactMethod.value === "phone" && phone === "") {
        showError("phone-error", "Please enter your phone number.");
        valid = false;
    } else if (phone !== "" && !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
        showError("phone-error", "Please use the format 123-456-7890 for your phone number.");
        valid = false;
    }

    if (message.length < 10) {
        showError("message-error", "Please enter at least 10 characters for your message.");
        valid = false;
    }

    return valid;
}

function setupForm() {
    const form = document.getElementById("interest-form");
    if (!form) return;

    const status = document.getElementById("form-status");
    let isSubmitting = false;

    form.addEventListener("invalid", function() {
        isSubmitting = true;
        status.textContent = "";
        validateFields();
    }, true);

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        isSubmitting = true;
        status.textContent = "";

        if (validateFields()) {
            status.textContent = "The form passed validation and was submitted successfully!";
        }
    });

    form.addEventListener("input", function() {
        if (isSubmitting) {
            status.textContent = "";
            validateFields();
        }
    });

    form.addEventListener("change", function() {
        if (isSubmitting) {
            status.textContent = "";
            validateFields();
        }
    });
}

setupClassFinder();
restoreClassChoice();
setupForm();