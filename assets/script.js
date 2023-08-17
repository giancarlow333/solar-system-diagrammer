// Requires
//const Star = req("utils.js");
// Element selectors
let svgElt = document.querySelector("#svg-output");
let ctrlElt = document.querySelector(".controls");
let currentSystemElt = document.querySelector(".current-system");
let sidebarElt = document.querySelector("#saved-systems");
let mapWidth = 500;
let systemName = "";
let systemObject = new StarSystem();
let ctr = 0;
// https://stackoverflow.com/questions/22894540/creating-circles-with-svg-and-javascript
const svgns = "http://www.w3.org/2000/svg";

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
  let star = new Star (systemName, lumos);
  systemObject.addStar(star);

  // add the star to the "current system" screen
  currentSystemElt.textContent = ""; // clear it if anything's there
  let h2Elt = document.createElement("h2");
  h2Elt.textContent = `${systemName} System`;
  currentSystemElt.appendChild(h2Elt);
  // need buttons to save both system and diagram
  let saveSystemBtnElt = document.createElement("button");
  saveSystemBtnElt.textContent = "Save System";
  saveSystemBtnElt.setAttribute("id", "save-system");
  saveSystemBtnElt.addEventListener("click", saveSystem);
  currentSystemElt.appendChild(saveSystemBtnElt);

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
  let circleElt = document.createElementNS(svgns, "circle");
  circleElt.setAttributeNS(null, "cx", mapWidth / 2);
  circleElt.setAttributeNS(null, "cy", mapWidth / 2);
  circleElt.setAttributeNS(null, "r", 100 * radius);
  circleElt.setAttributeNS(null, "fill", "none");
  circleElt.setAttributeNS(null, "stroke", "black");
  svgElt.appendChild(circleElt);

  // add planet to the system object
  let planet = new Planet(ctr, radius);
  systemObject.addPlanet(planet);
  ctr++;
}

function saveSystem(event) {
  event.preventDefault();
  localStorage.setItem(systemName, JSON.stringify(systemObject));
}

function addSavedSystemsToSidebar () {
  // https://stackoverflow.com/questions/47845210/check-if-exist-any-key-localstorage-javascript
  if (localStorage.length != 0) {
    sidebarElt.textContent = "";
    for (let i = 0; i < localStorage.length; i++) {
      // https://stackoverflow.com/questions/17745292/how-to-retrieve-all-localstorage-items-without-knowing-the-keys-in-advance
      let btnElt = document.createElement("button");
      btnElt.textContent = `${localStorage.key(i)} system`;
      btnElt.setAttribute("id", localStorage.key(i));
      btnElt.addEventListener("click", loadSavedSystem);
      sidebarElt.appendChild(btnElt);
    }
  }
}

function loadSavedSystem (event) {
  event.preventDefault();
  let key = this.id; //https://stackoverflow.com/questions/10291017/how-to-get-id-of-button-user-just-clicked
  let systemValue = localStorage.getItem(key);
  console.log("KEY:", key);
  console.log(systemValue);
  let loadedObj = JSON.parse(systemValue);
  console.log(loadedObj);
  currentSystemElt.textContent = ""; // clear it if anything's there
  let h2Elt = document.createElement("h2");
  h2Elt.textContent = `${loadedObj.name} System`;
  currentSystemElt.appendChild(h2Elt);
  let listElt = document.createElement("ol");

  for (let i = 0; i < loadedObj.planets.length; i ++) {
    let listItemElt = document.createElement("li");
    listItemElt.textContent = loadedObj.planets[i].orbitRadius + " AU";
    listElt.appendChild(listItemElt);
  }
  currentSystemElt.appendChild(listElt);

  // Recreate the svg
  createSVGFromSavedSystem(loadedObj);

  // clear the controls and prepare to add more planets
  ctrlElt.textContent = "";
  addPlanetDialog();
}

function createSVGFromSavedSystem (savedSystem) {
  let lumos = parseFloat(savedSystem.luminosity);
  console.log("lumos: ", lumos);

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

  // add the star
  let circleElt = document.createElementNS(svgns, "circle");
  circleElt.setAttributeNS(null, "cx", mapWidth / 2);
  circleElt.setAttributeNS(null, "cy", mapWidth / 2);
  circleElt.setAttributeNS(null, "r", "5");
  circleElt.setAttributeNS(null, "fill", "yellow");
  circleElt.setAttributeNS(null, "stroke", "black");
  svgElt.appendChild(circleElt);

  // add the planets
  for (let i = 0; i < savedSystem.planets.length; i++) {
    let radius = savedSystem.planets[i].orbitRadius;
    let circleElt = document.createElementNS(svgns, "circle");
    circleElt.setAttributeNS(null, "cx", mapWidth / 2);
    circleElt.setAttributeNS(null, "cy", mapWidth / 2);
    circleElt.setAttributeNS(null, "r", 100 * radius);
    circleElt.setAttributeNS(null, "fill", "none");
    circleElt.setAttributeNS(null, "stroke", "black");
    svgElt.appendChild(circleElt);
  }

  // Re-add save system
  // SET THE NAME!
  systemName = `${savedSystem.name}`;
  let saveSystemBtnElt = document.createElement("button");
  saveSystemBtnElt.textContent = "Save System";
  saveSystemBtnElt.setAttribute("id", "save-system");
  saveSystemBtnElt.addEventListener("click", saveSystem);
  currentSystemElt.appendChild(saveSystemBtnElt);
}

addSavedSystemsToSidebar();
displayStartingScreen();
