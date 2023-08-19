// Element selectors
let svgElt = document.querySelector("#svg-output");
let ctrlElt = document.querySelector(".controls");
let currentSystemElt = document.querySelector(".current-system");
let sidebarElt = document.querySelector("#saved-systems");

// Global variables
let mapWidth = 500;
let systemName = "";
let systemObject = new StarSystem();
let ctr = 0;
// https://stackoverflow.com/questions/22894540/creating-circles-with-svg-and-javascript
const svgns = "http://www.w3.org/2000/svg";
let doTheHabZone = true;
let calcTheMass = false;
let dropDownValue = ""; // arity from the dropdown for it

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
  startElt.addEventListener("click", askStarOptions);
}

/* askStarOptions function
 * Event handler
 * Adds a form to the screen to determine the type of system to do
 */
function askStarOptions(event) {
  event.preventDefault();
  ctrlElt.textContent = ""; // clear it if anything's there

  let formElt = document.createElement("form");
  let selectArityElt = document.createElement("select");
  let labelArityElt = document.createElement("label");
  let inputHabZnElt = document.createElement("input");
  let labelHabZnElt = document.createElement("label");

  // Ask how many stars in the system
  labelArityElt.textContent = "How many stars in the system?";
  labelArityElt.setAttribute("for", "arity");
  selectArityElt.setAttribute("name", "arity");
  selectArityElt.setAttribute("id", "arity");
  let singleOptionElt = document.createElement("option");
  let distantOptionElt = document.createElement("option");
  let circumOptionElt = document.createElement("option");
  singleOptionElt.setAttribute("value", "single");
  singleOptionElt.textContent = "Single star system";
  distantOptionElt.setAttribute("value", "distant");
  distantOptionElt.textContent = "Distant binary system";
  circumOptionElt.setAttribute("value", "circum");
  circumOptionElt.textContent = "Circumbinary system";

  selectArityElt.appendChild(singleOptionElt);
  selectArityElt.appendChild(distantOptionElt);
  selectArityElt.appendChild(circumOptionElt);

  // Do habitable zone?
  labelHabZnElt.textContent = "Include habitable zone?";
  inputHabZnElt.setAttribute("type", "checkbox");
  inputHabZnElt.setAttribute("name", "habzone");
  inputHabZnElt.setAttribute("id", "habzone");
  inputHabZnElt.checked = true; // https://stackoverflow.com/questions/8206565/check-uncheck-checkbox-with-javascript

  // Append to form
  formElt.appendChild(labelArityElt);
  formElt.appendChild(selectArityElt);
  formElt.appendChild(labelHabZnElt);
  formElt.appendChild(inputHabZnElt);

  // Submit
  let btnElt = document.createElement("button");
  btnElt.textContent = "Submit";
  btnElt.setAttribute("id", "submit-new-system");

  // Append form to controls
  ctrlElt.appendChild(formElt);
  ctrlElt.appendChild(btnElt);
  btnElt.addEventListener("click", systemOptionsHandler);
}

/* systemOptionsHandler function
 * Event handler
 * On submit, activate the function to do the right type of system
 * (single, circumbinary, etc.)
 */
function systemOptionsHandler(event) {
  event.preventDefault();

  if (!habzone.checked) {
    doTheHabZone = false;
    console.log("HabZone is NOT checked");
  }

  let dropDown = document.getElementById("arity");
  dropDownValue = dropDown.value;
  console.log(dropDownValue);

  if (dropDownValue === "single") {
    startNewSingleSystem();
  }
  else if (dropDownValue === "distant") {
    startNewMultipleSystem();
  }
  else { // circumbinary
    console.log("Circumbinary system");
  }
}

/* startNewSingleSystem function
 * Add a form to take input for a single star's parameters
 */
function startNewSingleSystem() {
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
  addStarElt.addEventListener("click", addSingleStar);
}

/* addSingleStar function
 * Event handler
 * Add a single star to the map and screen, and start adding planets
 */
function addSingleStar(event) {
  event.preventDefault();

  let lumos = document.getElementById("luminosity").value;
  systemName = document.getElementById("sysName").value

  // add the HabZone, if enabled
  if (doTheHabZone === true){
    addHabZoneSVGElements(lumos);
  }

  // Add the star
  addStarSVGElement();

  // add system to the system object
  let star = new Star (systemName, lumos);
  star.calcMass();
  star.calcRadius();
  systemObject.addStar(star);
  systemObject.setSystemLuminosity();
  systemObject.setSystemName(systemName);

  // add the star to the "current system" screen
  currentSystemElt.textContent = ""; // clear it if anything's there
  let h2Elt = document.createElement("h2");
  h2Elt.textContent = `${systemName} System`;
  currentSystemElt.appendChild(h2Elt);

  // add planets -- empty list right now
  let listElt = document.createElement("ol");
  listElt.setAttribute("id", "planet-list");
  currentSystemElt.appendChild(listElt);

  // need buttons to save both system and diagram
  addSaveButtonsToCurrentSystemScreen();

  ctrlElt.textContent = ""; // clear it if anything's there
  addPlanetDialog();
}

/* startNewMultipleSystem function
 * Add a form to take input for a multiple star's parameters
 */
function startNewMultipleSystem() {
  ctrlElt.textContent = ""; // clear it if anything's there
  let form1Elt = document.createElement("form");
  let inputNameElt = document.createElement("input");
  let labelNameElt = document.createElement("label");
  let inputLumosAElt = document.createElement("input");
  let labelLumosAElt = document.createElement("label");
  let inputLumosBElt = document.createElement("input");
  let labelLumosBElt = document.createElement("label");
  let inputSeparationElt = document.createElement("input");
  let labelSeparationElt = document.createElement("label");
  let inputEccenElt = document.createElement("input");
  let labelEccenElt = document.createElement("label");
  let noticeElt = document.createElement("p");
  let btnElt = document.createElement("button");
  let calcMassElt = document.createElement("input");
  let labelCalcMassElt = document.createElement("label");

  labelNameElt.textContent = "Enter system name: ";
  labelNameElt.setAttribute("for", "sysName");
  inputNameElt.setAttribute("name", "sysName");
  inputNameElt.setAttribute("id", "sysName");

  labelLumosAElt.textContent = "Enter luminosity of Star A: ";
  labelLumosAElt.setAttribute("for", "luminosityA");
  inputLumosAElt.setAttribute("name", "luminosityA");
  inputLumosAElt.setAttribute("id", "luminosityA");

  labelLumosBElt.textContent = "Enter luminosity of Star B: ";
  labelLumosBElt.setAttribute("for", "luminosityB");
  inputLumosBElt.setAttribute("name", "luminosityB");
  inputLumosBElt.setAttribute("id", "luminosityB");

  labelSeparationElt.textContent = "Enter separation between the stars (AU): "
  labelSeparationElt.setAttribute("for", "separation");
  inputSeparationElt.setAttribute("name", "separation");
  inputSeparationElt.setAttribute("id", "separation");

  labelEccenElt.textContent = "Enter orbital eccentricity: "
  labelEccenElt.setAttribute("for", "eccentricity");
  inputEccenElt.setAttribute("name", "eccentricity");
  inputEccenElt.setAttribute("id", "eccentricity");

  form1Elt.appendChild(labelNameElt);
  form1Elt.appendChild(inputNameElt);
  form1Elt.appendChild(labelLumosAElt);
  form1Elt.appendChild(inputLumosAElt);
  form1Elt.appendChild(labelLumosBElt);
  form1Elt.appendChild(inputLumosBElt);
  form1Elt.appendChild(labelSeparationElt);
  form1Elt.appendChild(inputSeparationElt);
  form1Elt.appendChild(labelEccenElt);
  form1Elt.appendChild(inputEccenElt);

  noticeElt.textContent = "Stellar mass is needed for binary systems.  You can enter the mass or have the program calculate it."
  let form2Elt = document.createElement("form");
  let inputMassAElt = document.createElement("input");
  let labelMassAElt = document.createElement("label");
  let inputMassBElt = document.createElement("input");
  let labelMassBElt = document.createElement("label");

  labelMassAElt.textContent = "Enter mass of Star A: ";
  labelMassAElt.setAttribute("for", "massA");
  inputMassAElt.setAttribute("name", "massA");
  inputMassAElt.setAttribute("id", "massA");

  labelMassBElt.textContent = "Enter mass of Star B: ";
  labelMassBElt.setAttribute("for", "massB");
  inputMassBElt.setAttribute("name", "massB");
  inputMassBElt.setAttribute("id", "massB");
  labelCalcMassElt.textContent = "Have program calculate mass?";
  calcMassElt.setAttribute("type", "checkbox");
  calcMassElt.setAttribute("name", "calcmass");
  calcMassElt.setAttribute("id", "calcmass");

  form2Elt.appendChild(labelMassAElt);
  form2Elt.appendChild(inputMassAElt);
  form2Elt.appendChild(labelMassBElt);
  form2Elt.appendChild(inputMassBElt);
  form2Elt.appendChild(labelCalcMassElt);
  form2Elt.appendChild(calcMassElt);

  btnElt.textContent = "Add Stars";
  btnElt.setAttribute("id", "add-star");

  ctrlElt.appendChild(form1Elt);
  ctrlElt.appendChild(noticeElt);
  ctrlElt.appendChild(form2Elt);
  ctrlElt.appendChild(btnElt);
  addStarElt = document.querySelector("#add-star");
  addStarElt.addEventListener("click", addMultipleStar);
}

/* addMultipleStar function
 * Event handler
 * Add multiple stars to the map and screen, and start adding planets
 */
function addMultipleStar(event) {
  event.preventDefault();

  if (calcmass.checked) {
    calcTheMass = true;
    console.log("CalcMass IS checked");
  }

  let lumosA = parseFloat(document.getElementById("luminosityA").value);
  let lumosB = parseFloat(document.getElementById("luminosityB").value);
  let separ = parseFloat(document.getElementById("separation").value);
  let eccen = parseFloat(document.getElementById("eccentricity").value);
  systemName = document.getElementById("sysName").value

  // add the HabZone, if enabled
  if (doTheHabZone === true){
    if (dropDownValue === "circum") {
      addHabZoneSVGElements(lumosA + lumosB);
    }
    else { // it must be a distant system; only A is considered
      addHabZoneSVGElements(lumosA);
    }
  }

  // add system to the system object
  let starA = new Star (`${systemName} A`, lumosA);
  let starB = new Star (`${systemName} B`, lumosB);

  // Do the masses
  if (calcTheMass === true) {
    starA.calcMass();
    starB.calcMass();
  }
  else { // Masses were given
    starA.setMass(document.getElementById("massA").value);
    starB.setMass(document.getElementById("massB").value);
  }
  starA.calcRadius();
  starB.calcRadius();

  let combinedMass = starA.getMass() + starB.getMass();

  systemObject.addStar(starA);
  systemObject.addStar(starB);
  systemObject.setSystemLuminosity();
  systemObject.setSystemName(systemName);

  // Add the stars
  if (dropDownValue === "circum") {
    //
  }
  else { // it must be a distant system
    let starAElt = document.createElementNS(svgns, "circle");
    let starBElt = document.createElementNS(svgns, "circle");
    let orbitAElt = document.createElementNS(svgns, "ellipse");
    let orbitBElt = document.createElementNS(svgns, "ellipse");
    let barycenterElt = document.createElementNS(svgns, "rect");
    let barycenterDistanceFromA = 100 * getDistanceToBarycenter(starA.getMass(), starB.getMass(), separ);
    console.log("barycenterDistanceFromA: ", barycenterDistanceFromA);
    let barycenterDistanceFromB = 100 * getDistanceToBarycenter(starB.getMass(), starA.getMass(), separ);
    console.log("barycenterDistanceFromB: ", barycenterDistanceFromB);
    let apastron = (1 + eccen) * separ;
    console.log("separ: ", separ);
    console.log("eccen: ", eccen);
    console.log("1 + eccen: ", 1 + eccen);
    console.log("apastron: ", apastron);

    // A's orbit
    let semiMajorAxisA = barycenterDistanceFromA; // in map units
    let semiMinorAxisA = semiMajorAxisA * Math.sqrt(1 - Math.pow(eccen, 2)); // in map units
    let centerToFocusA = Math.sqrt(Math.pow(semiMajorAxisA, 2) - Math.pow(semiMinorAxisA, 2)); // in map units

    orbitAElt.setAttributeNS(null, "cx", mapWidth / 2);
    orbitAElt.setAttributeNS(null, "cy", mapWidth / 2 + barycenterDistanceFromA);
    orbitAElt.setAttributeNS(null, "rx", semiMinorAxisA);
    orbitAElt.setAttributeNS(null, "ry", semiMajorAxisA);
    orbitAElt.setAttributeNS(null, "fill", "none");
    orbitAElt.setAttributeNS(null, "stroke", "navy");
    svgElt.appendChild(orbitAElt);
/*
    // B's orbit
    let semiMajorAxisB = barycenterDistanceFromB; // in map units
    let semiMinorAxisB = semiMajorAxisB * Math.sqrt(1 - Math.pow(eccen, 2)); // in map units
    let centerToFocusB = Math.sqrt(Math.pow(semiMajorAxisB, 2) - Math.pow(semiMinorAxisB, 2));

    orbitBElt.setAttributeNS(null, "cx", mapWidth / 2);
    orbitBElt.setAttributeNS(null, "cy", mapWidth / 2 + barycenterDistanceFromA + barycenterDistanceFromB - 2.5);
    orbitBElt.setAttributeNS(null, "rx", semiMinorAxisB);
    orbitBElt.setAttributeNS(null, "ry", centerToFocusB);
    orbitBElt.setAttributeNS(null, "fill", "none");
    orbitBElt.setAttributeNS(null, "stroke", "red");
    svgElt.appendChild(orbitBElt);
*/
    barycenterElt.setAttributeNS(null, "width", "5");
    barycenterElt.setAttributeNS(null, "height", "5");
    barycenterElt.setAttributeNS(null, "x", mapWidth / 2 - 2.5);
    barycenterElt.setAttributeNS(null, "y", mapWidth / 2 + barycenterDistanceFromA - 2.5);
    barycenterElt.setAttributeNS(null, "fill", "gray");
    //barycenterElt.setAttributeNS(null, "transform", "rotate(45)");
    svgElt.appendChild(barycenterElt);

    starAElt.setAttributeNS(null, "cx", mapWidth / 2);
    starAElt.setAttributeNS(null, "cy", mapWidth / 2);
    starAElt.setAttributeNS(null, "r", "5"); // 100 * starA.getRadius()
    starAElt.setAttributeNS(null, "fill", "yellow");
    starAElt.setAttributeNS(null, "stroke", "black");
    svgElt.appendChild(starAElt);

    starBElt.setAttributeNS(null, "cx", mapWidth / 2);
    starBElt.setAttributeNS(null, "cy", mapWidth / 2 + 50 * apastron); // half apastron
    starBElt.setAttributeNS(null, "r", "5"); // 100 * starA.getRadius()
    starBElt.setAttributeNS(null, "fill", "orange");
    starBElt.setAttributeNS(null, "stroke", "black");
    svgElt.appendChild(starBElt);
  }

  // add the star to the "current system" screen
  currentSystemElt.textContent = ""; // clear it if anything's there
  let h2Elt = document.createElement("h2");
  h2Elt.textContent = `${systemName} System`;
  currentSystemElt.appendChild(h2Elt);

  // add planets -- empty list right now
  let listElt = document.createElement("ol");
  listElt.setAttribute("id", "planet-list");
  currentSystemElt.appendChild(listElt);

  // need buttons to save both system and diagram
  addSaveButtonsToCurrentSystemScreen();

  ctrlElt.textContent = ""; // clear it if anything's there
  addPlanetDialog();
}

/* addPlanetDialog function
 * Show dialog to add planet
 */
function addPlanetDialog() {
  let formElt = document.createElement("form");
  let inputRadiusElt = document.createElement("input");
  let labelRadiusElt = document.createElement("label");
  let inputEccenElt = document.createElement("input");
  let labelEccenElt = document.createElement("label");
  let btnElt = document.createElement("button");

  labelRadiusElt.textContent = "Enter orbit radius (AU): ";
  labelRadiusElt.setAttribute("for", "orbit");
  inputRadiusElt.setAttribute("name", "orbit");
  inputRadiusElt.setAttribute("id", "orbit");

  labelEccenElt.textContent = "Enter orbial eccentricity: ";
  labelEccenElt.setAttribute("for", "eccentricity");
  inputEccenElt.setAttribute("name", "eccentricity");
  inputEccenElt.setAttribute("id", "eccentricity");
  inputEccenElt.setAttribute("placeholder", "0");

  btnElt.textContent = "Add Planet";
  btnElt.setAttribute("id", "add-planet");
  formElt.appendChild(labelRadiusElt);
  formElt.appendChild(inputRadiusElt);
  formElt.appendChild(labelEccenElt);
  formElt.appendChild(inputEccenElt);
  formElt.appendChild(btnElt);

  ctrlElt.appendChild(formElt);
  btnElt.addEventListener("click", addPlanet);
}

/* addPlanet function
 * Event handler
 * On button click, add the specified planet to the diagram
 */
function addPlanet(event) {
  // should check to see if it's already there!
  event.preventDefault();
  let radius = document.getElementById("orbit").value;
  let eccen = document.getElementById("eccentricity").value;
  if (eccen == null) { eccen = 0; }

  let semiMinorAxis = radius * Math.sqrt(1 - Math.pow(eccen, 2));
  let centerToFocus = Math.sqrt(Math.pow(radius, 2) - Math.pow(semiMinorAxis, 2));

  let ellipseElt = document.createElementNS(svgns, "ellipse");
  ellipseElt.setAttributeNS(null, "cx", mapWidth / 2 + (centerToFocus * 100));
  ellipseElt.setAttributeNS(null, "cy", mapWidth / 2);
  ellipseElt.setAttributeNS(null, "rx", 100 * radius);
  ellipseElt.setAttributeNS(null, "ry", 100 * semiMinorAxis);
  ellipseElt.setAttributeNS(null, "fill", "none");
  ellipseElt.setAttributeNS(null, "stroke", "black");
  svgElt.appendChild(ellipseElt);

  // add planet to the system object
  let planet = new Planet(ctr, radius);
  planet.setEccentricity(eccen);
  systemObject.addPlanet(planet);
  ctr++;

  // Add to current systems screen
  let listElt = document.getElementById("planet-list");
  let listItemElt = document.createElement("li");
  listItemElt.textContent = planet.orbitRadius + " AU";
  listElt.appendChild(listItemElt);
}

/* saveSystem function
 * Event handler
 * On click, save the system to localStorage
 */
function saveSystem(event) {
  event.preventDefault();
  // if it's already there, delete it and replace with current?
  let savedSystem = localStorage.getItem(systemName);
  if (!savedSystem) {
    localStorage.setItem(systemName, JSON.stringify(systemObject));
  }
  else {
    localStorage.removeItem(systemName);
    localStorage.setItem(systemName, JSON.stringify(systemObject));
  }
  addSavedSystemsToSidebar();
}

/* addSavedSystemsToSidebar function
 * Show the systems saved in localStorage on the sidebar
 */
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
    let clearAllSavedElt = document.createElement("button");
    clearAllSavedElt.textContent = "CLEAR ALL SAVED SYSTEMS";
    clearAllSavedElt.setAttribute("class", "clear");
    clearAllSavedElt.addEventListener("click", clearAllSavedSystems);
    sidebarElt.appendChild(clearAllSavedElt);
  }
  else { // There are none
    sidebarElt.textContent = "";
  }
}

/* loadSavedSystem function
 * Event handler
 *
 */
function loadSavedSystem (event) {
  event.preventDefault();
  let key = this.id; //https://stackoverflow.com/questions/10291017/how-to-get-id-of-button-user-just-clicked
  let systemValue = localStorage.getItem(key);
  let loadedObj = JSON.parse(systemValue);
  currentSystemElt.textContent = ""; // clear it if anything's there
  let h2Elt = document.createElement("h2");
  h2Elt.textContent = `${loadedObj.name} System`;
  currentSystemElt.appendChild(h2Elt);
  let listElt = document.createElement("ol");
  listElt.setAttribute("id", "planet-list");

  // recreate systemObject
  systemName = loadedObj.name;
  let star = new Star (loadedObj.name, loadedObj.luminosity);
  star.calcMass();
  star.calcRadius();
  systemObject.addStar(star);
  systemObject.setSystemLuminosity();
  systemObject.setSystemName(systemName);

  for (let i = 0; i < loadedObj.planets.length; i ++) {
    let planet = new Planet(i, loadedObj.planets[i].orbitRadius);
    planet.setEccentricity(loadedObj.planets[i].eccentricity);
    systemObject.addPlanet(planet);
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

/* createSVGFromSavedSystem function
 *
 */
function createSVGFromSavedSystem (savedSystem) {
  let lumos = parseFloat(savedSystem.luminosity);

  // add the HabZone
  addHabZoneSVGElements(lumos);

  // add the star
  addStarSVGElement();

  // add the planets
  for (let i = 0; i < savedSystem.planets.length; i++) {
    let radius = savedSystem.planets[i].orbitRadius;
    let eccen = savedSystem.planets[i].eccentricity;

    let semiMinorAxis = radius * Math.sqrt(1 - Math.pow(eccen, 2));
    let centerToFocus = Math.sqrt(Math.pow(radius, 2) - Math.pow(semiMinorAxis, 2));

    let ellipseElt = document.createElementNS(svgns, "ellipse");
    ellipseElt.setAttributeNS(null, "cx", mapWidth / 2 + (centerToFocus * 100));
    ellipseElt.setAttributeNS(null, "cy", mapWidth / 2);
    ellipseElt.setAttributeNS(null, "rx", 100 * radius);
    ellipseElt.setAttributeNS(null, "ry", 100 * semiMinorAxis);
    ellipseElt.setAttributeNS(null, "fill", "none");
    ellipseElt.setAttributeNS(null, "stroke", "black");
    svgElt.appendChild(ellipseElt);
  }

  // Re-add save system
  addSaveButtonsToCurrentSystemScreen();
}

/* clearAllSavedSystems function
 * Event handler
 * Delete ALL saved systems from localStorage
 */
function clearAllSavedSystems(event) {
  event.preventDefault();
  let text = "Are you sure you want to delete all saved systems?";
  if (confirm(text) == true) {
    localStorage.clear();
  }
  addSavedSystemsToSidebar();
  clearTheScreen();
}

/* saveSVGToFile function
 * Save the diagram to a file and download
 */
function saveSVGToFile() {
  // https://stackoverflow.com/questions/23218174/how-do-i-save-export-an-svg-file-after-creating-an-svg-with-d3-js-ie-safari-an
	// https://stackoverflow.com/questions/60241398/how-to-download-and-svg-element-as-an-svg-file
  const base64doc = btoa(unescape(encodeURIComponent(document.querySelector('svg').outerHTML)));
  const a = document.createElement('a');
  const e = new MouseEvent('click');

  a.download = `${systemName}_system_download.svg`;
  a.href = 'data:text/html;base64,' + base64doc;
  a.dispatchEvent(e);
}

/* addHabZoneSVGElements function
 *
 */
function addHabZoneSVGElements(luminosity) {
  let habEltInner = document.createElementNS(svgns, "circle");
  let habEltOuter = document.createElementNS(svgns, "circle");
  let habGroup = document.createElementNS(svgns, "g");

  habEltInner.setAttributeNS(null, "r", 100 * Math.sqrt(luminosity / 1.9))
  habEltInner.setAttributeNS(null, "cx", mapWidth / 2);
  habEltInner.setAttributeNS(null, "cy", mapWidth / 2);
  habEltInner.setAttributeNS(null, "fill", "white");
  habEltOuter.setAttributeNS(null, "r", 100 * Math.sqrt(luminosity / 0.65))
  habEltOuter.setAttributeNS(null, "cx", mapWidth / 2);
  habEltOuter.setAttributeNS(null, "cy", mapWidth / 2);
  habEltOuter.setAttributeNS(null, "fill", "lightgreen");
  habGroup.appendChild(habEltOuter);
  habGroup.appendChild(habEltInner);

  svgElt.appendChild(habGroup);
}

/* addStarSVGElement function
 *
 */
function addStarSVGElement() {
  let circleElt = document.createElementNS(svgns, "circle");

  circleElt.setAttributeNS(null, "cx", mapWidth / 2);
  circleElt.setAttributeNS(null, "cy", mapWidth / 2);
  circleElt.setAttributeNS(null, "r", "5");
  circleElt.setAttributeNS(null, "fill", "yellow");
  circleElt.setAttributeNS(null, "stroke", "black");

  svgElt.appendChild(circleElt);
}

function addDistantBinarySVGElements() {

}

/* clearTheScreen function
 *
 */
function clearTheScreen() {
  displayStartingScreen();
  currentSystemElt.textContent = "The current system's data will appear here.";
  svgElt.replaceChildren();
  systemObject = new StarSystem(); // delete current object
  ctr = 0;
}

/* addSaveButtonsToCurrentSystemScreen function
 *
 */
function addSaveButtonsToCurrentSystemScreen() {
  let saveSystemBtnElt = document.createElement("button");
  saveSystemBtnElt.textContent = "Save System";
  saveSystemBtnElt.setAttribute("id", "save-system");
  saveSystemBtnElt.addEventListener("click", saveSystem);
  currentSystemElt.appendChild(saveSystemBtnElt);

  let saveSVGBtnElt = document.createElement("button");
  saveSVGBtnElt.textContent = "Save SVG";
  saveSVGBtnElt.setAttribute("id", "save-svg");
  saveSVGBtnElt.addEventListener("click", saveSVGToFile);
  currentSystemElt.appendChild(saveSVGBtnElt);

  let homeBtnElt = document.createElement("button");
  homeBtnElt.textContent = "Home/Clear";
  homeBtnElt.setAttribute("id", "home");
  homeBtnElt.setAttribute("class", "clear");
  homeBtnElt.addEventListener("click", function (event) {
    event.preventDefault();
    clearTheScreen();
  });
  currentSystemElt.appendChild(homeBtnElt);
}

/*
 * Initialize
 */
addSavedSystemsToSidebar();
displayStartingScreen();
