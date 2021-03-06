// button
const btn_oneColorMode = document.getElementById("onecolor");
const btn_randomColorMode = document.getElementById("randomcolor");
const btn_grayColorMode = document.getElementById("graycolor");
const btn_eraseMode = document.getElementById("eraser");
const btn_clearBoard = document.getElementById("clear");

// interactive elements
const colorPicker = document.getElementById("colorpicker");
const slider = document.getElementById("slider");

// html display elements
const gridContainer = document.getElementById("grid-container");
const gridValueInfo = document.getElementById("grid-value-info");

// variables
let currentColor = colorPicker.value,
    oneColorMode = true,
    randomColorMode = false,
    grayColorMode = false,
    eraseMode = false,
    sliderValue = slider.value;

// button click events
btn_oneColorMode.onclick = () => {
    oneColorMode = true;

    eraseMode = false;
    randomColorMode = false;
    grayColorMode = false;

    btn_oneColorMode.classList.add("button-bg");
    btn_randomColorMode.classList.remove("button-bg");
    btn_grayColorMode.classList.remove("button-bg");
    btn_eraseMode.classList.remove("button-bg");

    colorGrid();
}
btn_randomColorMode.onclick = () => {
    randomColorMode = true;

    eraseMode = false;
    oneColorMode = false;
    grayColorMode = false;

    btn_oneColorMode.classList.remove("button-bg");
    btn_randomColorMode.classList.add("button-bg");
    btn_grayColorMode.classList.remove("button-bg");
    btn_eraseMode.classList.remove("button-bg");

    colorGrid();
}
btn_grayColorMode.onclick = () => {
    grayColorMode = true;

    eraseMode = false;
    oneColorMode = false;
    randomColorMode = false;

    btn_oneColorMode.classList.remove("button-bg");
    btn_randomColorMode.classList.remove("button-bg");
    btn_grayColorMode.classList.add("button-bg");
    btn_eraseMode.classList.remove("button-bg");
    
    colorGrid();
}
btn_eraseMode.onclick = () => {
    eraseMode = true;

    oneColorMode = false;
    randomColorMode = false;
    grayColorMode = false;

    btn_oneColorMode.classList.remove("button-bg");
    btn_randomColorMode.classList.remove("button-bg");
    btn_grayColorMode.classList.remove("button-bg");
    btn_eraseMode.classList.add("button-bg");

    colorGrid();
}
btn_clearBoard.onclick = () => {
    createGrid();
}

// methods 
function createGrid() {
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${sliderValue}, 1fr)`;
    for (let i = 1; i <= sliderValue * sliderValue; i++) {
        const div = document.createElement("div");
        div.classList.add("grid-item");
        gridContainer.appendChild(div);
    }
    updateGridInfo();
    colorGrid();
}
function updateGridInfo() {
    gridValueInfo.innerHTML = `${sliderValue} x ${sliderValue}`;
}
function colorGrid() {
    const gridItems = gridContainer.querySelectorAll(".grid-item");
    gridItems.forEach(item => item.onmouseover = () => {
        if (eraseMode) {
            item.style.background = "white";
        } else if (oneColorMode) {
            item.style.background = currentColor;
        } else if (randomColorMode) {
            let randomHexCode = Math.floor(Math.random()*16777215).toString(16);
            item.style.background = '#' + randomHexCode;
        } else if (grayColorMode) {
            let rgbaValuesArray = getComputedStyle(item).getPropertyValue("background-color").match(/[\d.]+/g);
            if (rgbaValuesArray[0] != 0 || rgbaValuesArray[1] != 0 || rgbaValuesArray[2] != 0) {
                item.style.background = `rgba(0, 0, 0, 0.1)`
            } else {
                let alphaValueOfItem = parseFloat(rgbaValuesArray[3]) + 0.1;
                if (alphaValueOfItem > 1) {
                    alphaValueOfItem = 0;
                }
                item.style.background = `rgba(0, 0, 0, ${alphaValueOfItem})`;
            }
        }
    });
}

// slider events
slider.onchange = (event) => {
    sliderValue = event.target.value;
    createGrid();
};
slider.onmousemove = (event) => {
    sliderValue = event.target.value;
    updateGridInfo();
}

// pick color
colorPicker.onchange = () => {
    currentColor = colorPicker.value;
}

// initiate 
createGrid();