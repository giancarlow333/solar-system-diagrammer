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
  let formElt = document.createElement("form");
  let inputElt = document.createElement("input");
  let labelElt = document.createElement("label");
  let btnElt = document.createElement("button");

  labelElt.textContent = "Enter stellar luminosity: ";
  labelElt.setAttribute("for", "luminosity");
  inputElt.setAttribute("name", "luminosity");
  inputElt.setAttribute("id", "luminosity");

  btnElt.textContent = "Add Star";
  btnElt.setAttribute("id", "add-star");
  formElt.appendChild(labelElt);
  formElt.appendChild(inputElt);
  formElt.appendChild(btnElt);

  ctrlElt.appendChild(formElt);
  addStarElt = document.querySelector("#add-star");
  addStarElt.addEventListener("click", function (event) {
    //let starText = `<circle cx="0" cy="0" r="10" fill="yellow" stroke="black" />`;
    event.preventDefault();
    let circleElt = document.createElementNS(svgns, "circle");
    circleElt.setAttributeNS(null, "cx", "300");
    circleElt.setAttributeNS(null, "cy", "300");
    circleElt.setAttributeNS(null, "r", "10");
    circleElt.setAttributeNS(null, "fill", "yellow");
    circleElt.setAttributeNS(null, "stroke", "black");
    svgElt.appendChild(circleElt);
  });
}

displayStartingScreen();
