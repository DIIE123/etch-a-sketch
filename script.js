const CONTAINER_DIMENSIONS = 480;

let canvasDimensions = 16;
let brushColor = "rgb(0, 0, 0)";
let rainbow = false;
let holding = false;
let currentSelected = document.querySelector("#normal");

const colorPicker = document.querySelector("#color-picker");
const tools = document.querySelector("#tools");
const container = document.querySelector("#container");
container.style.width = container.style.height = `${CONTAINER_DIMENSIONS}px`;

startSite();
 
function startSite () {
    createGrid(canvasDimensions);

    const delay = 0.2;
    const toolList = Array.from(tools.children);
    for (let i = 0; i < toolList.length; i++) {
        toolList[i].classList.add("fadein");
        toolList[i].style.animationDelay = `${delay * (i + 2)}s`;
    }
}

function createGrid(dimensions) {
    container.textContent = "";

    for (let i = 0; i < dimensions; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < dimensions; j++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.style.width = pixel.style.height = `${CONTAINER_DIMENSIONS / dimensions}px`;
            pixel.style.backgroundColor = "rgb(255, 255, 255)";

            row.appendChild(pixel);
        }
        container.appendChild(row);
    }
}

function draw(target) {
    if (target.classList.contains("pixel") && holding) {
        if (rainbow) {
            target.style.backgroundColor = randomRGB();
        }
        else {
            target.style.backgroundColor = brushColor;
        }
    }
}

function select(target) {
    rainbow = false;
    currentSelected.classList.remove("selected");
    currentSelected = target;
    currentSelected.classList.add("selected");
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRGB() {
    return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
}

container.addEventListener("mousedown", (event) => {
    holding = true;
    draw(event.target);
});

container.addEventListener("mouseup", () => {
    holding = false;
});

container.addEventListener("mouseover", (event) => {
    draw(event.target);
});

colorPicker.addEventListener("input", () => {
    brushColor = colorPicker.value;
    colorPicker.style.backgroundColor = colorPicker.value;
});

tools.addEventListener("click", (event) => {
    switch(event.target.id) {
        case "normal":
            select(event.target);
            brushColor = colorPicker.value;
            break;
        case "rainbow":
            select(event.target);
            rainbow = true;
            break;
        case "eraser":
            select(event.target);
            brushColor = "rgb(255, 255, 255)";
            break;
        case "clear":
            createGrid(canvasDimensions);
            break;
        case "size":
            let input = prompt("Enter the new size (max 100):");
            while (isNaN(input) || input < 1 || input > 100) {
                if (input === null) break;
                input = prompt("Invalid! Enter the new size (max 100):");
            }

            if (input === null) break;
            canvasDimensions = input;
            createGrid(canvasDimensions);
            break;
    }
});

