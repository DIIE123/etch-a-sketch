const CONTAINER_DIMENSIONS = 640;

let brushColor = "black";

const container = document.querySelector("#container");
container.style.width = container.style.height = `${CONTAINER_DIMENSIONS}px`;

createGrid(16);

function createGrid(dimensions) {
    container.textContent = "";

    for (let i = 0; i < dimensions; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < dimensions; j++) {
            const pixel = document.createElement("div");
            pixel.classList.add("pixel");
            pixel.style.width = pixel.style.height = `${CONTAINER_DIMENSIONS / dimensions}px`;
            pixel.style.backgroundColor = "white";

            row.appendChild(pixel);
        }
        container.appendChild(row);
    }
}

container.addEventListener("mouseover", (event) => {
    const target = event.target;

    if (target.classList.contains("pixel")) {
        target.style.backgroundColor = brushColor;
    }
});