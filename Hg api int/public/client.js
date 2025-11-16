// -------------------------------
//  FORM SUBMISSION HANDLER
// -------------------------------

document.getElementById("assessmentForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Disable button while generating report
    const submitBtn = document.getElementById("submitBtn");
    submitBtn.disabled = true;
    submitBtn.innerText = "Generating Report... ⏳";

    // Collect ALL form data
    const parentName = document.getElementById("parentName").value.trim();
    const parentEmail = document.getElementById("parentEmail").value.trim();
    const parentPhone = document.getElementById("parentPhone").value.trim();

    const childName = document.getElementById("childName").value.trim();
    const childAge = document.getElementById("childAge").value.trim();
    const childGender = document.getElementById("childGender").value;

    const hoursPerDay = document.getElementById("hoursPerDay").value;

    const mainConcerns = document.getElementById("mainConcerns").value.trim();
    const additionalNotes = document.getElementById("additionalNotes").value.trim();

    // Collect checkboxes
    const behaviors = Array.from(document.querySelectorAll("input[name='behaviors']:checked"))
        .map(el => el.value);

    // Handle optional video
    const videoFile = document.getElementById("videoUpload").files[0];
    let videoName = videoFile ? videoFile.name : "No video uploaded";

    // -------------------------------
    // Build the data object to send
    // -------------------------------
    const formData = {
        parent: {
            name: parentName,
            email: parentEmail,
            contact: parentPhone
        },
        child: {
            name: childName,
            age: childAge,
            gender: childGender,
            screenTime: hoursPerDay
        },
        observed: behaviors,
        concerns: mainConcerns,
        notes: additionalNotes,
        video: videoName
    };

    // Display "loading" in textarea
    const output = document.getElementById("aiReport");
    output.value = "Generating AI Report... Please wait ⏳";

    try {
        const response = await fetch("/generate-report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: formData })
        });

        if (!response.ok) {
            const errorText = await response.text();
            output.value = "Error: Server error → " + errorText;
            submitBtn.disabled = false;
            submitBtn.innerText = "Generate Report";
            return;
        }

        const result = await response.json();
        output.value = result.report || "No report generated.";
    } catch (error) {
        output.value = "Error: " + error.message;
    }

    submitBtn.disabled = false;
    submitBtn.innerText = "Generate Report";
});



// -------------------------------
//  VIDEO PREVIEW HANDLER
// -------------------------------

const uploadArea = document.getElementById("uploadArea");
const videoInput = document.getElementById("videoUpload");
const videoPreviewContainer = document.getElementById("videoPreviewContainer");
const videoPreview = document.getElementById("videoPreview");
const videoFileName = document.getElementById("videoFileName");
const removeVideoBtn = document.getElementById("removeVideoBtn");
const uploadPrompt = document.getElementById("uploadPrompt");

// When user selects video
videoInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const url = URL.createObjectURL(file);
    videoPreview.src = url;
    videoFileName.innerText = file.name;

    videoPreviewContainer.classList.remove("hidden");
    uploadPrompt.classList.add("hidden");
});

// Remove video
removeVideoBtn.addEventListener("click", function () {
    videoInput.value = "";
    videoPreview.src = "";
    videoFileName.innerText = "";

    videoPreviewContainer.classList.add("hidden");
    uploadPrompt.classList.remove("hidden");
});
