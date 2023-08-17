// Element selectors
let svgElt = document.querySelector("#svg-output");
let ctrlElt = document.querySelector(".controls");
let mapWidth = 500;
let systemName = "";
//let systemObject = {};
// https://stackoverflow.com/questions/22894540/creating-circles-with-svg-and-javascript
const svgns = "http://www.w3.org/2000/svg",
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
  let inputNameElt = document.createElement("input");
  let labelNameElt = document.createElement("label");
  let inputLumosElt = document.createElement("input");
  let labelLumosElt = document.createElement("label");
  let btnElt = document.createElement("button");

  labelNameElt.textContent = "Enter system name: ";
  labelNameElt.setAttribute("for", "sysName");
  inputNameElt.setAttribute("name", "sysName");
  inputNameElt.setAttribute("id", "sysName");

  labelLumosElt.textContent = "Enter stellar luminosity: ";
  labelLumosElt.setAttribute("for", "luminosity");
  inputLumosElt.setAttribute("name", "luminosity");
  inputLumosElt.setAttribute("id", "luminosity");

  btnElt.textContent = "Add Star";
  btnElt.setAttribute("id", "add-star");
  formElt.appendChild(labelNameElt);
  formElt.appendChild(inputNameElt);
  formElt.appendChild(labelLumosElt);
  formElt.appendChild(inputLumosElt);
  formElt.appendChild(btnElt);

  ctrlElt.appendChild(formElt);
  addStarElt = document.querySelector("#add-star");
  addStarElt.addEventListener("click", addStarAndHabZone);
}

function addStarAndHabZone(event) {
  //let starText = `<circle cx="0" cy="0" r="10" fill="yellow" stroke="black" />`;
  event.preventDefault();
  let lumos = document.getElementById("luminosity").value;
  systemName = document.getElementById("sysName").value

  // add the HabZone
  let habEltInner = document.createElementNS(svgns, "circle");
  let habEltOuter = document.createElementNS(svgns, "circle");
  let habGroup = document.createElementNS(svgns, "g");
  habEltInner.setAttributeNS(null, "r", 100 * Math.sqrt(lumos / 1.9))
  habEltInner.setAttributeNS(null, "cx", mapWidth / 2);
  habEltInner.setAttributeNS(null, "cy", mapWidth / 2);
  habEltInner.setAttributeNS(null, "fill", "white");
  habEltOuter.setAttributeNS(null, "r", 100 * Math.sqrt(lumos / 0.65))
  habEltOuter.setAttributeNS(null, "cx", mapWidth / 2);
  habEltOuter.setAttributeNS(null, "cy", mapWidth / 2);
  habEltOuter.setAttributeNS(null, "fill", "lightgreen");
  habGroup.appendChild(habEltOuter);
  habGroup.appendChild(habEltInner);
  svgElt.appendChild(habGroup);

  // Add the star
  let circleElt = document.createElementNS(svgns, "circle");
  circleElt.setAttributeNS(null, "cx", mapWidth / 2);
  circleElt.setAttributeNS(null, "cy", mapWidth / 2);
  circleElt.setAttributeNS(null, "r", "5");
  circleElt.setAttributeNS(null, "fill", "yellow");
  circleElt.setAttributeNS(null, "stroke", "black");
  svgElt.appendChild(circleElt);

  // add system to the system object
  // TO DO!

  ctrlElt.textContent = ""; // clear it if anything's there
  addPlanetDialog();
}

function addPlanetDialog() {
  let formElt = document.createElement("form");
  let inputElt = document.createElement("input");
  let labelElt = document.createElement("label");
  let btnElt = document.createElement("button");

  labelElt.textContent = "Enter orbit radius (AU): ";
  labelElt.setAttribute("for", "orbit");
  inputElt.setAttribute("name", "orbit");
  inputElt.setAttribute("id", "orbit");

  btnElt.textContent = "Add Planet";
  btnElt.setAttribute("id", "add-planet");
  formElt.appendChild(labelElt);
  formElt.appendChild(inputElt);
  formElt.appendChild(btnElt);

  ctrlElt.appendChild(formElt);
  btnElt.addEventListener("click", addPlanet);
}

function addPlanet(event) {
  event.preventDefault();
  let radius = document.getElementById("orbit").value;
  console.log("radius: ", radius, typeof(radius));
  let circleElt = document.createElementNS(svgns, "circle");
  circleElt.setAttributeNS(null, "cx", mapWidth / 2);
  circleElt.setAttributeNS(null, "cy", mapWidth / 2);
  circleElt.setAttributeNS(null, "r", 100 * radius);
  circleElt.setAttributeNS(null, "fill", "none");
  circleElt.setAttributeNS(null, "stroke", "black");
  svgElt.appendChild(circleElt);

}

displayStartingScreen();
