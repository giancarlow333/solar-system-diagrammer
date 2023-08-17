// Element selectors
let svgElt = document.querySelector("#svg-output");
let ctrlElt = document.querySelector(".controls");
// https://stackoverflow.com/questions/22894540/creating-circles-with-svg-and-javascript
var svgns = "http://www.w3.org/2000/svg",
    container = document.getElementById( 'cont' );

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
    let starText = `<circle cx="0" cy="0" r="10" fill="yellow" />`;
    let circleElt = document.createElementNS(svgns, "circle");
    circleElt.setAttributeNS(null, "cx", "300");
    circleElt.setAttributeNS(null, "cy", "300");
    circleElt.setAttributeNS(null, "r", "10");
    circleElt.setAttributeNS(null, "fill", "yellow");
    svgElt.appendChild(circleElt);
  });
}

displayStartingScreen();
