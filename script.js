/* =========================================
   TRAFFIC LIGHT AUTOMATA - FINAL
========================================= */

const states = [
    { name: "RED", duration: 10 },
    { name: "GREEN", duration: 10 },
    { name: "YELLOW", duration: 3 }
];

let currentState = 0;
let remainingTime = 10;

let simulationInterval = null;
let carInterval = null;
let running = false;


/* =========================================
   VEHICLE POSITIONS
========================================= */

let carPositions = [720, 470, 220];


/* =========================================
   GET CARS
========================================= */

function getCars() {
    return document.querySelectorAll(".car");
}


/* =========================================
   SHOW CARS
========================================= */

function showCars() {

    const cars = getCars();

    carPositions = [720, 470, 220];

    cars.forEach((car, index) => {

        car.style.setProperty(
            "left",
            carPositions[index] + "px",
            "important"
        );

        car.style.setProperty(
            "transform",
            "none",
            "important"
        );

    });
}


/* =========================================
   MAIN UPDATE
========================================= */

function updateSignal() {

    const state = states[currentState];

    const current =
        document.getElementById("currentState");

    const timer =
        document.getElementById("timer");


    if (current) {
        current.textContent = state.name;
    }

    if (timer) {
        timer.textContent = remainingTime;
    }


    /* MAIN LIGHT */

    const red = document.getElementById("red");
    const yellow = document.getElementById("yellow");
    const green = document.getElementById("green");


    if (red) red.classList.remove("active");
    if (yellow) yellow.classList.remove("active");
    if (green) green.classList.remove("active");


    if (state.name === "RED" && red) {
        red.classList.add("active");
    }

    if (state.name === "YELLOW" && yellow) {
        yellow.classList.add("active");
    }

    if (state.name === "GREEN" && green) {
        green.classList.add("active");
    }


    updateHeroSignal(state.name);
    updateFSM(state.name);
    updateRoadSignal(state.name);
}


/* =========================================
   HERO SIGNAL
========================================= */

function updateHeroSignal(stateName) {

    const red = document.getElementById("hero-red");
    const yellow = document.getElementById("hero-yellow");
    const green = document.getElementById("hero-green");

    if (!red || !yellow || !green) return;


    red.style.background = "#475569";
    yellow.style.background = "#475569";
    green.style.background = "#475569";

    red.style.boxShadow = "none";
    yellow.style.boxShadow = "none";
    green.style.boxShadow = "none";


    if (stateName === "RED") {

        red.style.background = "#ef4444";

        red.style.boxShadow =
            "0 0 25px rgba(239,68,68,.8)";
    }


    if (stateName === "YELLOW") {

        yellow.style.background = "#facc15";

        yellow.style.boxShadow =
            "0 0 25px rgba(250,204,21,.8)";
    }


    if (stateName === "GREEN") {

        green.style.background = "#22c55e";

        green.style.boxShadow =
            "0 0 25px rgba(34,197,94,.8)";
    }
}


/* =========================================
   FSM
========================================= */

function updateFSM(stateName) {

    const nodes =
        document.querySelectorAll(".fsm-state");

    nodes.forEach(node => {

        node.style.transform = "scale(1)";

        if (
            node.innerText
                .toUpperCase()
                .includes(stateName)
        ) {
            node.style.transform = "scale(1.08)";
        }

    });
}


/* =========================================
   ROAD SIGNAL
========================================= */

function updateRoadSignal(stateName) {

    const red =
        document.getElementById("road-red");

    const yellow =
        document.getElementById("road-yellow");

    const green =
        document.getElementById("road-green");

    const status =
        document.getElementById("trafficStatus");


    if (!red || !yellow || !green) return;


    red.classList.remove("active");
    yellow.classList.remove("active");
    green.classList.remove("active");


    /* RED */

    if (stateName === "RED") {

        red.classList.add("active");

        if (status) {
            status.textContent =
                "Vehicles are STOPPED";

            status.style.color = "#dc2626";
        }

        stopCars();
    }


    /* YELLOW */

    else if (stateName === "YELLOW") {

        yellow.classList.add("active");

        if (status) {
            status.textContent =
                "Vehicles are moving slowly";

            status.style.color = "#ca8a04";
        }

        startCars(1);
    }


    /* GREEN */

    else {

        green.classList.add("active");

        if (status) {
            status.textContent =
                "Vehicles are MOVING";

            status.style.color = "#16a34a";
        }

        startCars(2);
    }
}


/* =========================================
   MOVE CARS
   RIGHT → LEFT
========================================= */

function startCars(speed) {

    if (carInterval !== null) {
        clearInterval(carInterval);
    }


    const cars = getCars();


    carInterval = setInterval(() => {

        cars.forEach((car, index) => {

            carPositions[index] -= speed;


            /*
             * When the car reaches
             * the LEFT edge, immediately
             * return it to RIGHT.
             */

            if (carPositions[index] < -50) {

                carPositions[index] = 760;
            }


            car.style.setProperty(
                "left",
                carPositions[index] + "px",
                "important"
            );

        });

    }, 40);
}


/* =========================================
   STOP CARS
========================================= */

function stopCars() {

    if (carInterval !== null) {

        clearInterval(carInterval);

        carInterval = null;
    }
}


/* =========================================
   NEXT STATE
========================================= */

function nextState() {

    currentState++;

    if (currentState >= states.length) {
        currentState = 0;
    }

    remainingTime =
        states[currentState].duration;

    updateSignal();
}


/* =========================================
   START
========================================= */

function startSimulation() {

    if (running) return;

    running = true;


    simulationInterval =
        setInterval(() => {

            remainingTime--;


            if (remainingTime <= 0) {

                nextState();

            } else {

                updateSignal();
            }

        }, 1000);
}


/* =========================================
   STOP
========================================= */

function stopSimulation() {

    running = false;


    if (simulationInterval !== null) {

        clearInterval(simulationInterval);

        simulationInterval = null;
    }


    stopCars();
}


/* =========================================
   RESET
========================================= */

function resetSimulation() {

    stopSimulation();

    currentState = 0;

    remainingTime =
        states[0].duration;

    showCars();

    updateSignal();
}


/* =========================================
   INITIAL LOAD
========================================= */

showCars();

updateSignal();