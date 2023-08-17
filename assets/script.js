// Element selectors
let svgElt = document.querySelector("#svg-output");
let ctrlElt = document.querySelector(".controls");

// displayStartingScreen function
function displayStartingScreen () {
  ctrlElt.textContent = ""; // clear it if anything's there

  let p1Elt = document.createElement("p");
  let btnElt = document.createElement("button");

  p1Elt.textContent = "To create a new system, click the button below!";
  btnElt.textContent = "Start New System";
  btnElt.setAttribute("id", "start-new-system");

  ctrlElt.appendChild(p1Elt);
  ctrlElt.appendChild(btnElt);
  startElt = document.querySelector("#start-new-system");
  startElt.addEventListener("click", startNewSystem);
}

function startNewSystem(event) {
  event.preventDefault();
  ctrlElt.textContent = ""; // clear it if anything's there

  let btnElt = document.createElement("button");
  btnElt.textContent = "Add Star";
  btnElt.setAttribute("id", "add-star");
  ctrlElt.appendChild(btnElt);
  addStarElt = document.querySelector("#add-star");
  addStarElt.addEventListener("click", function () {
    let starText = `<circle cx="150" cy="100" r="80" fill="green" />`;
    let circleElt = document.createElement("circle");
    circleElt.setAttribute("cx", "300");
    circleElt.setAttribute("cy", "300");
    circleElt.setAttribute("r", "10");
    circleElt.setAttribute("fill", "yellow");
    svgElt.appendChild(circleElt);
  });
}

displayStartingScreen();
