
/* 1. Select HTML elements */

const addButton = document.querySelector("#add-job-btn");
const heroAddButton = document.querySelector("#hero-add-btn");
const closeButton = document.querySelector("#close-modal");

const modal = document.querySelector("#job-modal");
const form = document.querySelector("#job-form");
const jobList = document.querySelector("#job-list");

const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");


/* 2. Store jobs */

let jobs = JSON.parse(localStorage.getItem("jobs")) || [
    {
        company: "Google",
        role: "Python Developer",
        location: "Bangalore",
        status: "Applied"
    }
];

// Save the initial job data
localStorage.setItem("jobs", JSON.stringify(jobs));


/* 3. Open modal */

addButton.addEventListener("click", function() {
    modal.classList.add("show");
});

heroAddButton.addEventListener("click", function() {
    modal.classList.add("show");
});


/* 4. Close modal */

closeButton.addEventListener("click", function() {
    modal.classList.remove("show");
});


/* 5. Display, search and filter jobs */

function displayJobs() {
    jobList.innerHTML = "";

    // Get search and filter values
    const searchText = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    // Check each job
    for (const job of jobs) {

        // Search by company, role or location
        const matchesSearch =
            job.company.toLowerCase().includes(searchText) ||
            job.role.toLowerCase().includes(searchText) ||
            job.location.toLowerCase().includes(searchText);

        // Check application status
        const matchesStatus =
            selectedStatus === "All" ||
            job.status === selectedStatus;

        // Display only matching jobs
        if (matchesSearch && matchesStatus) {

            const card = document.createElement("div");
            card.classList.add("job-card");

            const heading = document.createElement("h3");
            heading.textContent = job.company;

            const role = document.createElement("p");
            role.textContent = "Role: " + job.role;

            const location = document.createElement("p");
            location.textContent = "Location: " + job.location;

            const status = document.createElement("p");
            status.textContent = "Status: " + job.status;

            card.appendChild(heading);
            card.appendChild(role);
            card.appendChild(location);
            card.appendChild(status);

            jobList.appendChild(card);
        }
    }

    // Show message if no jobs match
    if (jobList.innerHTML === "") {
        jobList.textContent = "No matching jobs found.";
    }
}


/* 6. Search and filter events */

searchInput.addEventListener("input", displayJobs);
statusFilter.addEventListener("change", displayJobs);


/* 7. Add a new job */

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const company = document.querySelector("#company").value.trim();
    const role = document.querySelector("#role").value.trim();
    const location = document.querySelector("#location").value.trim();
    const status = document.querySelector("#status").value;

    // Check empty fields
    if (company === "" || role === "" || location === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Create a job object
    const newJob = {
        company: company,
        role: role,
        location: location,
        status: status
    };

    // Add job to the array
    jobs.push(newJob);

    // Save jobs
    localStorage.setItem("jobs", JSON.stringify(jobs));

    // Update job cards
    displayJobs();

    // Clear form and close modal
    form.reset();
    modal.classList.remove("show");
});


/* 8. Display jobs when page loads */

displayJobs();
