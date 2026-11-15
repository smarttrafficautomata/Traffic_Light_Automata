let states = [
    {
        name: "RED",
        duration: 10
    },
    {
        name: "GREEN",
        duration: 10
    },
    {
        name: "YELLOW",
        duration: 3
    }
];

let currentState = 0;
let remainingTime = states[0].duration;
let interval = null;
let running = false;


function updateSignal() {

    const state = states[currentState];

    document.getElementById("currentState").textContent = state.name;
    document.getElementById("timer").textContent = remainingTime;

    // Turn all lights OFF
    document.getElementById("red").classList.remove("active");
    document.getElementById("yellow").classList.remove("active");
    document.getElementById("green").classList.remove("active");

    // Turn current light ON
    if (state.name === "RED") {
        document.getElementById("red").classList.add("active");
    }

    else if (state.name === "YELLOW") {
        document.getElementById("yellow").classList.add("active");
    }

    else if (state.name === "GREEN") {
        document.getElementById("green").classList.add("active");
    }
}


function nextState() {

    currentState++;

    if (currentState >= states.length) {
        currentState = 0;
    }

    remainingTime = states[currentState].duration;

    updateSignal();
}


function startSimulation() {

    if (running) {
        return;
    }

    running = true;

    interval = setInterval(() => {

        remainingTime--;

        if (remainingTime <= 0) {
            nextState();
        }

        else {
            updateSignal();
        }

    }, 1000);
}


function stopSimulation() {

    running = false;

    clearInterval(interval);
    interval = null;
}


function resetSimulation() {

    stopSimulation();

    currentState = 0;
    remainingTime = states[0].duration;

    updateSignal();
}


// Initial state
updateSignal();