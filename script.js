const FIREBASE_DB_URL = "https://stardance-testing-default-rtdb.europe-west1.firebasedatabase.app/";
let pollInterval = null;
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1542181317410693140/5xwZW3wx5GWtTOV6VGjgF9PwZ7_Tt_57Y0i7Wg0CKv0dJyx53jSRDEcU0jyA4OAsPs_l";
const MISSION = [
    { riddle: "FIRST RIDDLE", answer: "FIRST ANSWER" },
    { riddle: "SECOND RIDDLE", answer: "SECOND ANSWER" },
    { riddle: "THIRD RIDDLE", answer: "THIRD ANSWER" }
];

// Read level safely
let currentLevel = parseInt(localStorage.getItem("currentMissionLevel"), 10) || 0;

window.onload = function () {
    const savedMission = localStorage.getItem("currentMission");
    const feedback = document.getElementById("feedback-message");

    if (feedback) {
        feedback.innerText = "";
    }

    // Redirect to victory page if all missions completed
    if (currentLevel >= MISSION.length) {
        window.location.href = "birthday.html";
        return;
    }

    // Set objective riddle text
    const riddleText = document.getElementById("riddle-text");
    if (riddleText) {
        riddleText.innerText = `"${MISSION[currentLevel].riddle}"`;
    }

    // Resume polling if page reloaded while pending
    if (savedMission === "level_pending") {
        startApprovalPolling(currentLevel);
    }
};

function previewPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const preview = document.getElementById("user-photo-preview");
    const container = document.getElementById("preview-container");

    reader.onload = function (e) {
        preview.src = e.target.result;
        container.style.display = "block";
    };

    reader.readAsDataURL(file);
}

function startApprovalPolling(level) {
    if (pollInterval) {
        clearInterval(pollInterval);
    }

    pollInterval = setInterval(() => {
        fetch(`${FIREBASE_DB_URL}/mission/level_${level}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch mission status");
                }
                return response.json();
            })
            .then((data) => {
                if (!data) return;

                if (data.status === "APPROVED") {
                    clearInterval(pollInterval);
                    pollInterval = null;

                    localStorage.setItem("currentMissionLevel", String(level + 1));
                    localStorage.removeItem("currentMission");

                    window.location.href = (level + 1 >= MISSION.length) ? "birthday.html" : "game.html";
                } else if (data.status === "DENIED") {
                    clearInterval(pollInterval);
                    pollInterval = null;

                    localStorage.removeItem("currentMission");
                    const feedback = document.getElementById("feedback-message");
                    if (feedback) {
                        feedback.style.color = "#ff3333";
                        feedback.innerText = "> REJECTED. PLEASE RETRY SUBMISSION.";
                    }
                }
            })
            .catch(() => {
                // Keep polling silently if network fluctuates
            });
    }, 3000);
}

function submitMissionData() {
    const fileInput = document.getElementById("photo-upload");
    const feedback = document.getElementById("feedback-message");

    if (!fileInput || fileInput.files.length === 0) {
        if (feedback) {
            feedback.style.color = "#ff3333";
            feedback.innerText = "> ERROR: VISUAL EVIDENCE REQUIRED!";
        }
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function(e){
        localStorage.setItem(`mission_photo_${currentLevel}`, e.target.result);
    };
    reader.readAsDataURL(file);
    const formData = new FormData();

    formData.append("content", `**LEVEL ${currentLevel + 1} SUBMISSION**\nAgent Binary uploaded visual evidence!`);
    formData.append("file", file, file.name);

    if (feedback) {
        feedback.style.color = "#00e5ff";
        feedback.innerText = "> TRANSMITTING DATA TO MISSION CONTROL...";
    }

    fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        body: formData
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to send Discord webhook");
        }

        return fetch(`${FIREBASE_DB_URL}/mission/level_${currentLevel}.json`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "PENDING" })
        });
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to update mission status");
        }

        localStorage.setItem("currentMission", "level_pending");
        if (feedback) {
            feedback.style.color = "#00e5ff";
            feedback.innerText = "> MISSION DATA TRANSMITTED. AWAITING APPROVAL.";
        }

        startApprovalPolling(currentLevel);
    })
    .catch(() => {
        if (feedback) {
            feedback.style.color = "#ff3333";
            feedback.innerText = "> TRANSMISSION ERROR: COULD NOT CONNECT.";
        }
    });
}

function hardResetApp() {
    localStorage.clear();
    window.location.href = "game.html";
}