var fullscreen = false;
var timer;
var running = false;

var hours = 0;
var minutes = 0;
var seconds = 0;

document.onkeydown = (e) => {
    if (e.key === "s" || e.keyCode == 32) { ToggleTimer(); }
    else if (e.key === "r") { ClearTimer(); }
    else if (e.key === "f") { ToggleFullscreen(); }
}

function DrawTime() {
    document.getElementById("hour").innerText = `${hours}h`;
    document.getElementById("minute").innerText = `${minutes}m`;
    document.getElementById("second").innerText = `${seconds}s`;
}

function ToggleFullscreen() {
    var elem = document.documentElement;
    if (!fullscreen) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
        document.getElementById("fullscreen-icon").innerText = "fullscreen_exit";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
        document.getElementById("fullscreen-icon").innerText = "fullscreen";
    }
    fullscreen = !fullscreen;
}

function ToggleTimer() {
    if (!running) { StartTimer(); }
    else { StopTimer(); }
    running = !running;
}

function StartTimer() {
    timer = setInterval(function () {
        seconds++;
        if (seconds == 60) { seconds = 0; minutes++; }
        if (minutes == 60) { minutes = 0; hours++; }

        DrawTime();

    }, 1000);
    document.getElementById("start-btn").innerText = "stop";
}

function StopTimer() {
    clearInterval(timer);
    document.getElementById("start-btn").innerText = "start";
}

function ClearTimer() {
    StopTimer();
    hours = 0, minutes = 0, seconds = 0;
    DrawTime();
}