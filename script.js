
/* 1. Select HTML elements */

const addButton = document.querySelector("#add-job-btn");
const heroAddButton = document.querySelector("#hero-add-btn");
const closeButton = document.querySelector("#close-modal");

const modal = document.querySelector("#job-modal");
const form = document.querySelector("#job-form");
const jobList = document.querySelector("#job-list");


/* 2. Store the first job */

const jobs = JSON.parse(localStorage.getItem("jobs"))||[
    {
        company: "Google",
        role: "Python Developer",
        location: "Bangalore",
        status: "Applied"
    }
];


/* 3. Open modal from the Add Job button */

addButton.addEventListener("click", function () {
    modal.classList.add("show");
});


/* 4. Open modal from the Hero button */

heroAddButton.addEventListener("click", function () {
    modal.classList.add("show");
});


/* 5. Close modal */

closeButton.addEventListener("click", function () {
    modal.classList.remove("show");
});


/* 6. Display jobs on the webpage */

function displayJobs() {

    // Remove the old job cards
    jobList.innerHTML = "";

    // Loop through the jobs array
    for (const job of jobs) {

        // Create a job card
        const card = document.createElement("div");
        card.classList.add("job-card");

        // Company name
        const heading = document.createElement("h3");
        heading.textContent = job.company;

        // Job role
        const role = document.createElement("p");
        role.textContent = "Role: " + job.role;

        // Job location
        const location = document.createElement("p");
        location.textContent = "Location: " + job.location;

        // Application status
        const status = document.createElement("p");
        status.textContent = "Status: " + job.status;

        // Add details to the card
        card.appendChild(heading);
        card.appendChild(role);
        card.appendChild(location);
        card.appendChild(status);

        // Add the card to the webpage
        jobList.appendChild(card);
    }
}


/* 7. Handle form submission */

form.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Get values from the form
    const company = document.querySelector("#company").value.trim();
    const role = document.querySelector("#role").value.trim();
    const location = document.querySelector("#location").value.trim();
    const status = document.querySelector("#status").value;

    // Check whether required fields are empty
    if (company === "" || role === "" || location === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Create a new job object
    const newJob = {
        company: company,
        role: role,
        location: location,
        status: status
    };

    // Add the new job to the array
    jobs.push(newJob);

    localStorage.setItem("jobs", JSON.stringify(jobs));

    // Update the webpage
    displayJobs();

    // Clear the form
    form.reset();

    // Close the modal
    modal.classList.remove("show");
});


/* 8. Display jobs when the page loads */

displayJobs();
