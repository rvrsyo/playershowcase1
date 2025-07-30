// --- Hero Data (IMPORTANT: Customize this with your actual hero names and image paths) ---
// Ensure these paths lead to actual image files.
const heroData = [
    { name: 'Jett', image: 'Assets/AgentPick/jett.png'},
    { name: 'Astra', image: 'Assets/AgentPick/Astra.png'},
    { name: 'Breach', image: 'Assets/AgentPick/Breach.png'},
    { name: 'Chamber', image: 'Assets/AgentPick/Chamber.png'},
    { name: 'Clove', image: 'Assets/AgentPick/Clove.png'},
    { name: 'Cypher', image: 'Assets/AgentPick/Cypher.png'},
    { name: 'Deadlock', image: 'Assets/AgentPick/Deadlock.png'},
    { name: 'Fade', image: 'Assets/AgentPick/Fade.png'},
    { name: 'Harbor', image: 'Assets/AgentPick/Harbor.png'},
    { name: 'Gekko', image: 'Assets/AgentPick/Gekko.png'},
    { name: 'Iso', image: 'Assets/AgentPick/Iso.png'},
    { name: 'Kayo', image: 'Assets/AgentPick/Kayo.png'},
    { name: 'Killjoy', image: 'Assets/AgentPick/Killjoy.png'},
    { name: 'Neon', image: 'Assets/AgentPick/Neon.png'},
    { name: 'Omen', image: 'Assets/AgentPick/Omen.png'},
    { name: 'Phoenix', image: 'Assets/AgentPick/Phoenix.png'},
    { name: 'Raze', image: 'Assets/AgentPick/Raze.png'}

]
// --- Global State Variables ---
let timerInterval;
; // Default timer value
let currentPhaseIndex = 0;
const phases = [
    "ASCENT"
];

// --- Initialization on Page Load ---
document.addEventListener('DOMContentLoaded', () => {
    updateOutput(); // Set initial nickname outputs
    updateTournamentName(); // Set initial tournament name output
    updatePhase(); // Set initial phase display
    setupDropdowns(); // Populate dropdowns for picks/bans
    resetImagePlaceholders(); // Ensure team logos reset to placeholders on load
    updateWinLoseImages(); // Set initial state of win/lose indicators
    // Initially hide all dropdown items
    document.querySelectorAll('.dropdown-items').forEach(dropdown => {
        dropdown.style.display = 'none';
    });
});

// --- Tournament Name Functionality ---
const tournamentNameInput = document.getElementById('tournamentnamemid');
const tournamentNameOutput = document.getElementById('tournamentnameOutput');

if (tournamentNameInput) {
    tournamentNameInput.addEventListener('input', updateTournamentName);
}

function updateTournamentName() {
    if (tournamentNameOutput && tournamentNameInput) {
        tournamentNameOutput.textContent = tournamentNameInput.value || "TXC Valorant Finals";
    }
}

// --- Team Name Functionality ---
const team1Input = document.getElementById('team1');
const team2Input = document.getElementById('team2');
const teamNameDisplay1 = document.getElementById('teamNameDisplay1');
const teamNameDisplay2 = document.getElementById('teamNameDisplay2');

if (team1Input) {
    team1Input.addEventListener('input', updateTeamName);
}
if (team2Input) {
    team2Input.addEventListener('input', updateTeamName);
}

function updateTeamName() {
    if (teamNameDisplay1 && team1Input) {
        teamNameDisplay1.textContent = team1Input.value || "SBM Eagles";
    }
    if (teamNameDisplay2 && team2Input) {
        teamNameDisplay2.textContent = team2Input.value || "CCS Wizards";
    }
}

// --- Dynamic Image Loading for Team Logos (From File Input) ---
function loadImage(event, imgId) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const imgElement = document.getElementById(imgId);
            if (imgElement) {
                imgElement.src = e.target.result;
            } else {
                console.error('Image element with ID ' + imgId + ' not found.');
            }
        };

        reader.readAsDataURL(selectedFile);
    } else {
        // If no file is selected, revert to placeholder or a default empty state
        const imgElement = document.getElementById(imgId);
        if (imgElement) {
             imgElement.src = `https://via.placeholder.com/300x200?text=Upload+Logo`; // Or a blank image
        }
        console.log('No file selected for ' + imgId);
    }
}

// Function to reset team logo image sources to placeholders
function resetImagePlaceholders() {
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');
    if (image1) image1.src = "https://via.placeholder.com/300x200?text=Image+1";
    if (image2) image2.src = "https://via.placeholder.com/300x200?text=Image+2";
}


// --- Nickname Update Functionality ---
function updateOutput() {
    for (let i = 1; i <= 10; i++) {
        const inputElement = document.getElementById(`input${i}`);
        const outputElement = document.getElementById(`output${i}`);
        if (inputElement && outputElement) {
            outputElement.textContent = inputElement.value;
        }
    }
}

// --- Reset and Switch Nicknames ---
function resetInputs() {
    for (let i = 1; i <= 10; i++) {
        const inputElement = document.getElementById(`input${i}`);
        if (inputElement) {
            inputElement.value = '';
        }
    }
    updateOutput(); // Update display after resetting inputs
}

function switchInputs() {
    const tempInputs = [];
    const tempOutputs = [];

    // Store current values
    for (let i = 1; i <= 5; i++) {
        const input = document.getElementById(`input${i}`);
        const output = document.getElementById(`output${i}`);
        if (input) tempInputs.push(input.value);
        if (output) tempOutputs.push(output.textContent);
    }

    // Move red side to blue side
    for (let i = 1; i <= 5; i++) {
        const inputRed = document.getElementById(`input${i + 5}`);
        const outputRed = document.getElementById(`output${i + 5}`); // Note: outputs are 6-10
        const inputBlue = document.getElementById(`input${i}`);
        const outputBlue = document.getElementById(`output${i}`); // Note: outputs are 1-5

        if (inputRed && inputBlue) {
            inputBlue.value = inputRed.value;
        }
        if (outputRed && outputBlue) {
            outputBlue.textContent = outputRed.textContent;
        }
    }

    // Move stored blue side to red side
    for (let i = 1; i <= 5; i++) {
        const inputRed = document.getElementById(`input${i + 5}`);
        const outputRed = document.getElementById(`output${i + 5}`);
        if (inputRed) {
            inputRed.value = tempInputs[i - 1];
        }
        if (outputRed) {
            outputRed.textContent = tempOutputs[i - 1];
        }
    }
    updateOutput(); // Ensure all outputs are consistent with inputs
}

// --- Win/Loss Checkbox Functionality ---
function toggleImage(imgId) {
    const imageElement = document.getElementById(imgId);
    const checkboxElement = document.getElementById(`checkbox${imgId.replace('extraImage', '')}`); // Get checkbox ID from imgId
    if (imageElement && checkboxElement) {
        // Toggle visibility based on checkbox state
        imageElement.style.visibility = checkboxElement.checked ? 'visible' : 'hidden';
    }
}

function updateWinLoseImages() {
    for (let i = 1; i <= 6; i++) { // Checkboxes 1-6 for extraImage1-6
        const checkboxElement = document.getElementById(`checkbox${i}`);
        const imageElement = document.getElementById(`extraImage${i}`);
        if (checkboxElement && imageElement) {
            // Set initial visibility based on the checkbox's initial unchecked state
            imageElement.style.visibility = checkboxElement.checked ? 'visible' : 'hidden';
        }
    }
}

// --- Timer Functionality ---
const timerDisplay = document.getElementById('timer');
const phaseDisplay = document.getElementById('phase');
const directionImage = document.querySelector('.direction img'); // Get the GIF element

function updateTimer() {
    if (timeLeft < 0) {
        timeLeft = 0;
        clearInterval(timerInterval);
        // Optionally, trigger next phase or signal end of time
        console.log("Time's up!");
        return;
    }
    timerDisplay.textContent = timeLeft;
    timeLeft--;
}

function startTimer() {
    clearInterval(timerInterval); // Clear any existing interval
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 15; // Reset to default
    timerDisplay.textContent = timeLeft;
}

function updatePhase() {
    if (phaseDisplay) {
        phaseDisplay.textContent = phases[currentPhaseIndex];
    }
    // Update direction GIF based on phase or turn, if applicable
    if (directionImage) {
        // Example: Change GIF based on current phase
        // Ensure you have these GIF files: Assets/Other/ban_direction.gif, Assets/Other/pick_direction.gif
        if (currentPhaseIndex % 2 === 0) { // Ban phases (0, 2, 4)
            directionImage.src = 'Assets/Other/ban_direction.gif';
        } else { // Pick phases (1, 3, 5)
            directionImage.src = 'Assets/Other/pick_direction.gif';
        }
        // If 'Adjustment.gif' is the only one, keep this: directionImage.src = 'Assets/Other/Adjustment.gif';
    }
}

function nextPhase() {
    currentPhaseIndex++;
    if (currentPhaseIndex >= phases.length) {
        currentPhaseIndex = 0; // Loop back to start or handle end of draft
    }
    updatePhase();
    resetTimer(); // Reset timer for the new phase
    startTimer(); // Start timer for the new phase
}

// Event Listeners for Timer Control Buttons
document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('nextPhase').addEventListener('click', nextPhase);

// --- Dropdown/Pick/Ban Functionality ---

// Function to populate dropdown items
function setupDropdowns() {
    for (let i = 1; i <= 16; i++) { // Iterate through all search dropdowns
        const dropdownItemsDiv = document.getElementById(`dropdown-items-${i}`);
        if (dropdownItemsDiv) {
            dropdownItemsDiv.innerHTML = ''; // Clear previous items
            heroData.forEach(hero => {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.textContent = hero.name;
                item.dataset.heroName = hero.name; // Store hero name for selection
                item.dataset.heroImage = hero.image; // Store image path
                item.onclick = () => selectDropdownItem(hero, i);
                dropdownItemsDiv.appendChild(item);
            });
        }
    }
}

// Function to filter dropdown items based on input
function filterDropdown(dropdownIndex) {
    const searchInput = document.getElementById(`search-${dropdownIndex}`);
    const dropdownItemsDiv = document.getElementById(`dropdown-items-${dropdownIndex}`);
    if (searchInput && dropdownItemsDiv) {
        const filter = searchInput.value.toLowerCase();
        const items = dropdownItemsDiv.getElementsByClassName('dropdown-item');
        let hasVisibleItems = false; // To check if any items are visible

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.textContent.toLowerCase().includes(filter)) {
                item.style.display = ''; // Show item
                hasVisibleItems = true;
            } else {
                item.style.display = 'none'; // Hide item
            }
        }
        dropdownItemsDiv.style.display = hasVisibleItems ? 'block' : 'none'; // Show/hide dropdown container
    }
}

// Function to handle selection of a dropdown item
function selectDropdownItem(hero, dropdownIndex) {
    const searchInput = document.getElementById(`search-${dropdownIndex}`);
    const dropdownItemsDiv = document.getElementById(`dropdown-items-${dropdownIndex}`);
    const imageDisplayDiv = document.getElementById(`image-display-${dropdownIndex}`); // The div that holds the image

    if (searchInput && imageDisplayDiv) {
        searchInput.value = hero.name; // Set input field to selected hero name
        dropdownItemsDiv.style.display = 'none'; // Hide dropdown after selection

        // Get the parent .pick1 or .ban1 element
        const parentSlot = imageDisplayDiv.closest('.pick1') || imageDisplayDiv.closest('.ban1');

        if (parentSlot) {
            // Immediately clear the background image of the parent slot
            parentSlot.style.backgroundImage = 'none';
            parentSlot.style.backgroundColor = 'transparent'; // Ensure no lingering color

            // Create or update the agent portrait image within the image-display div
            let imgElement = imageDisplayDiv.querySelector('img');
            if (!imgElement) {
                imgElement = document.createElement('img');
                imageDisplayDiv.appendChild(imgElement);
            }

            // --- CRITICAL FOR ANIMATION RE-TRIGGERING ---
            // Remove the slide-in class first, and force reflow
            imgElement.classList.remove('slide-in');
            // This line forces a reflow, making the browser re-calculate styles
            // before the 'slide-in' class is added back.
            void imgElement.offsetWidth; // eslint-disable-line no-unused-expressions

            // Set the new image source
            imgElement.src = hero.image; // Portrait image
            imgElement.alt = hero.name;
            imgElement.style.filter = 'none'; // Reset filter for portrait

            // Apply grayscale filter for ban slots only to the portrait image
            if ((dropdownIndex >= 6 && dropdownIndex <= 8) || (dropdownIndex >= 14 && dropdownIndex <= 16)) {
                imgElement.style.filter = 'grayscale(100%)';
            }

            // Add the slide-in class to trigger the animation
            imgElement.classList.add('slide-in');
        }
    }
}

// Hide dropdowns when clicking outside
document.addEventListener('click', function(event) {
    document.querySelectorAll('.dropdown-items').forEach(dropdown => {
        // Check if the click was outside the dropdown input AND the dropdown items
        if (!dropdown.previousElementSibling.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
});

// Function to reset all dropdowns and associated images/backgrounds
function resetAllDropdowns() {
    for (let i = 1; i <= 16; i++) {
        const searchInput = document.getElementById(`search-${i}`);
        const imageDisplayDiv = document.getElementById(`image-display-${i}`);
        const parentSlot = imageDisplayDiv ? (imageDisplayDiv.closest('.pick1') || imageDisplayDiv.closest('.ban1')) : null;

        if (searchInput) {
            searchInput.value = ''; // Clear search input
        }
        if (imageDisplayDiv) {
            // --- CRITICAL: Animate out and then remove ---
            const imgElement = imageDisplayDiv.querySelector('img');
            if (imgElement) {
                imgElement.classList.remove('slide-in'); // Start animation out
                imgElement.style.transform = 'translateY(100%)'; // Ensure it slides out downwards
                imgElement.style.opacity = '0'; // Fade out

                // Remove the image element after the animation completes
                imgElement.addEventListener('transitionend', function handler() {
                    imageDisplayDiv.innerHTML = ''; // Remove the image
                    imgElement.removeEventListener('transitionend', handler); // Clean up listener
                }, { once: true }); // Ensure listener is called only once
            }
        }
        if (parentSlot) {
            // Restore the default background by clearing inline styles
            parentSlot.style.backgroundImage = ''; // This will make CSS nth-of-type re-apply
            parentSlot.style.backgroundColor = ''; // Clear any inline background color
        }
    }
    setupDropdowns(); // Re-populate dropdowns
}

// --- Switch All Functionality (Team Names, Logos, Nicknames, Picks/Bans) ---
function switchAll() {
    // 1. Switch Team Names
    const team1Name = team1Input.value;
    team1Input.value = team2Input.value;
    team2Input.value = team1Name;
    updateTeamName();

    // 2. Switch Team Logos
    const img1 = document.getElementById('image1');
    const img2 = document.getElementById('image2');
    const img1Src = img1.src;
    img1.src = img2.src;
    img2.src = img1Src;

    // 3. Switch Nicknames
    const tempNicknames = {};
    for (let i = 1; i <= 5; i++) {
        tempNicknames[`input${i}`] = document.getElementById(`input${i}`).value;
    }
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`input${i}`).value = document.getElementById(`input${i + 5}`).value;
        document.getElementById(`input${i + 5}`).value = tempNicknames[`input${i}`];
    }
    updateOutput();

    // 4. Switch Win/Loss Checkboxes and Images
    const tempCheckboxes = {};
    for (let i = 1; i <= 3; i++) {
        tempCheckboxes[`checkbox${i}`] = document.getElementById(`checkbox${i}`).checked;
    }
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`checkbox${i}`).checked = document.getElementById(`checkbox${i + 3}`).checked;
        document.getElementById(`checkbox${i + 3}`).checked = tempCheckboxes[`checkbox${i}`];
    }
    updateWinLoseImages(); // Update visual state based on new checkbox states

    // 5. Switch Picks and Bans
    const blueSlots = [1, 2, 3, 4, 5, 6, 7, 8]; // Blue picks (1-5), Blue bans (6-8)
    const redSlots = [9, 10, 11, 12, 13, 14, 15, 16]; // Red picks (9-13), Red bans (14-16) (indices 1-8 logic)

    const tempSlotData = {};

    // Store current state of blue slots
    blueSlots.forEach(index => {
        const searchInput = document.getElementById(`search-${index}`);
        const imageDisplayDiv = document.getElementById(`image-display-${index}`);
        const imgElement = imageDisplayDiv.querySelector('img');

        tempSlotData[index] = {
            name: searchInput ? searchInput.value : '',
            imgSrc: imgElement ? imgElement.src : '',
            imgFilter: imgElement ? imgElement.style.filter : 'none',
        };
    });

    // Function to apply slot data
    const applySlotData = (targetIndex, sourceData) => {
        const targetSearchInput = document.getElementById(`search-${targetIndex}`);
        const targetImageDisplayDiv = document.getElementById(`image-display-${targetIndex}`);
        const targetParentSlot = targetImageDisplayDiv.closest('.pick1') || targetImageDisplayDiv.closest('.ban1');

        if (targetSearchInput && targetImageDisplayDiv && targetParentSlot) {
            targetSearchInput.value = sourceData.name;

            // Clear existing image and background before applying new
            targetImageDisplayDiv.innerHTML = '';
            targetParentSlot.style.backgroundImage = ''; // Restore CSS default
            targetParentSlot.style.backgroundColor = ''; // Restore CSS default

            if (sourceData.imgSrc) {
                let imgElement = document.createElement('img');
                targetImageDisplayDiv.appendChild(imgElement);

                imgElement.src = sourceData.imgSrc;
                imgElement.alt = sourceData.name;
                imgElement.style.filter = sourceData.imgFilter;

                // Apply slide-in animation immediately
                imgElement.classList.add('slide-in');
                // Remove the default background as an agent is now picked
                targetParentSlot.style.backgroundImage = 'none';
                targetParentSlot.style.backgroundColor = 'transparent';
            }
        }
    };

    // Move red slots to blue slots
    blueSlots.forEach((blueIndex, i) => {
        const redIndex = redSlots[i];
        const sourceSearchInput = document.getElementById(`search-${redIndex}`);
        const sourceImageDisplayDiv = document.getElementById(`image-display-${redIndex}`);
        const sourceImgElement = sourceImageDisplayDiv.querySelector('img');

        const sourceData = {
            name: sourceSearchInput ? sourceSearchInput.value : '',
            imgSrc: sourceImgElement ? sourceImgElement.src : '',
            imgFilter: sourceImgElement ? sourceImgElement.style.filter : 'none',
        };
        applySlotData(blueIndex, sourceData);
    });

    // Move stored blue slots to red slots
    redSlots.forEach((redIndex, i) => {
        const blueIndex = blueSlots[i];
        applySlotData(redIndex, tempSlotData[blueIndex]);
    });

    setupDropdowns(); // Re-populate dropdowns after switch
}


// --- Master Reset Function ---
function resetContent() {
    resetInputs(); // Reset nicknames
    resetAllDropdowns(); // Reset picks/bans and images
    resetTimer(); // Reset timer
    currentPhaseIndex = 0; // Reset phase
    updatePhase();
    resetImagePlaceholders(); // Reset team logos to placeholders
    // Reset tournament name input and display
    if (tournamentNameInput) {
        tournamentNameInput.value = '';
    }
    updateTournamentName();
    // Reset team name inputs and displays
    if (team1Input) {
        team1Input.value = '';
    }
    if (team2Input) {
        team2Input.value = '';
    }
    updateTeamName();
    // Reset win/loss checkboxes
    for (let i = 1; i <= 6; i++) {
        const checkbox = document.getElementById(`checkbox${i}`);
        if (checkbox) {
            checkbox.checked = false;
        }
    }
    updateWinLoseImages(); // Update visual state of win/lose indicators
}