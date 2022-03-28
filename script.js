// Get the Elements

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress_filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player_slider");

// Build functions
function togglePlay() {
    if(video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚'
    toggle.innerText = icon
} 

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function updateRange() {
    video[this.name] = this.value;
}

function handleProgress() {
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`
}function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime
}


// Add Event Listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);


toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip));
// ranges.forEach(range => range.addEventListener("change", updateRange));
ranges.forEach(range => range.addEventListener("click", updateRange));


let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);