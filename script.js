
/* ========================================
   1. SELECT HTML ELEMENTS
======================================== */

const addButton = document.querySelector("#add-job-btn");
const heroAddButton = document.querySelector("#hero-add-btn");
const closeButton = document.querySelector("#close-modal");

const modal = document.querySelector("#job-modal");
const form = document.querySelector("#job-form");
const jobList = document.querySelector("#job-list");

const searchInput = document.querySelector("#search-input");
const statusFilter = document.querySelector("#status-filter");


/* ========================================
   2. LOAD SAVED JOBS
======================================== */

let jobs = JSON.parse(localStorage.getItem("jobs")) || [
    {
        company: "Google",
        role: "Python Developer",
        location: "Bangalore",
        status: "Applied"
    }
];

// Save the jobs
localStorage.setItem("jobs", JSON.stringify(jobs));


/* ========================================
   3. OPEN MODAL
======================================== */

addButton.addEventListener("click", function() {
    modal.classList.add("show");
});

heroAddButton.addEventListener("click", function() {
    modal.classList.add("show");
});


/* ========================================
   4. CLOSE MODAL
======================================== */

closeButton.addEventListener("click", function() {
    modal.classList.remove("show");
});


/* ========================================
   5. DISPLAY, SEARCH AND FILTER JOBS
======================================== */

function displayJobs() {
    // Clear old job cards
    jobList.innerHTML = "";

    // Get search text and selected status
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;

    // Check every job
    for (const job of jobs) {

        // Search by company, role or location
        const matchesSearch =
            job.company.toLowerCase().includes(searchText) ||
            job.role.toLowerCase().includes(searchText) ||
            job.location.toLowerCase().includes(searchText);

        // Check selected status
        const matchesStatus =
            selectedStatus === "All" ||
            job.status === selectedStatus;

        // Display only matching jobs
        if (matchesSearch && matchesStatus) {

            // Create the job card
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


            /* CREATE ACTION CONTAINER */

            const actions = document.createElement("div");
            actions.classList.add("job-card-actions");


            /* CREATE STATUS DROPDOWN */

            const statusSelect = document.createElement("select");
            statusSelect.classList.add("status-select");

            const statuses = [
                "Applied",
                "Interview",
                "Selected",
                "Rejected"
            ];

            // Add options to the dropdown
            for (const item of statuses) {
                const option = document.createElement("option");

                option.value = item;
                option.textContent = item;

                statusSelect.appendChild(option);
            }

            // Show the current status
            statusSelect.value = job.status;


            /* CREATE UPDATE STATUS BUTTON */

            const updateButton = document.createElement("button");
            updateButton.textContent = "Update Status";
            updateButton.classList.add("update-btn");

            updateButton.addEventListener("click", function() {

                // Update the job status
                job.status = statusSelect.value;

                // Save updated jobs
                localStorage.setItem("jobs", JSON.stringify(jobs));

                // Display the updated cards
                displayJobs();
            });


            /* CREATE DELETE BUTTON */

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-btn");

            deleteButton.addEventListener("click", function() {

                // Ask before deleting
                const confirmDelete = confirm(
                    "Are you sure you want to delete this job?"
                );

                if (confirmDelete) {

                    // Find the job position
                    const index = jobs.indexOf(job);

                    // Remove the job
                    jobs.splice(index, 1);

                    // Save the updated jobs
                    localStorage.setItem(
                        "jobs",
                        JSON.stringify(jobs)
                    );

                    // Refresh the cards
                    displayJobs();
                }
            });


            /* ADD BUTTONS TO ACTION CONTAINER */

            actions.appendChild(statusSelect);
            actions.appendChild(updateButton);
            actions.appendChild(deleteButton);


            /* ADD DETAILS TO THE CARD FIRST */

            card.appendChild(heading);
            card.appendChild(role);
            card.appendChild(location);
            card.appendChild(status);


            /* ADD ACTIONS AFTER THE DETAILS */

            card.appendChild(actions);


            /* ADD COMPLETED CARD TO THE PAGE */

            jobList.appendChild(card);
        }
    }

    // Show message if no jobs match
    if (jobList.children.length === 0) {
        jobList.textContent = "No matching jobs found.";
    }
}


/* ========================================
   6. SEARCH AND FILTER EVENTS
======================================== */

// Search while typing
searchInput.addEventListener("input", displayJobs);

// Filter when status changes
statusFilter.addEventListener("change", displayJobs);


/* ========================================
   7. ADD A NEW JOB
======================================== */

form.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();

    // Get form values
    const company = document.querySelector("#company").value.trim();
    const role = document.querySelector("#role").value.trim();
    const location = document.querySelector("#location").value.trim();
    const status = document.querySelector("#status").value;

    // Check required fields
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

    // Add job to the array
    jobs.push(newJob);

    // Save jobs in localStorage
    localStorage.setItem("jobs", JSON.stringify(jobs));

    // Update the job cards
    displayJobs();

    // Clear the form
    form.reset();

    // Close the modal
    modal.classList.remove("show");
});


/* ========================================
   8. DISPLAY JOBS WHEN PAGE LOADS
======================================== */

displayJobs();
