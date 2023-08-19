class Star {
  constructor (name, luminosity) {
    this.name = name;
    this.luminosity = parseFloat(luminosity);
    this.mass = undefined;
    this.radius = undefined;
  }

  setMass (m) {
    this.mass = parseFloat(m);
  }

  setRadius (r) {
    this.radius = r;
  }

  calcMass() {
    this.mass = Math.pow(this.luminosity, 2 / 7);
  }

  calcRadius () {
    if (this.mass) {
      this.radius = Math.pow(this.mass, 0.8);
    }
  }

  getRadius () {
    return this.radius;
  }

  getMass () {
    return this.mass;
  }
}

class Planet {
  constructor(id, orbitRadius) {
    this.id = id;
    this.orbitRadius = orbitRadius;
    this.eccentricity = 0;
    this.periapsis = 0;
  }

  setEccentricity (e) {
    this.eccentricity = e;
  }

  setPeriapsis (p) {
    this.periapsis = p;
  }
}

class StarSystem {
  constructor(name, luminosity) {
    this.systemName = name;
    this.systemLuminosity = luminosity;
    this.stars = []; // Star object(s)
    this.planets = [];
  }

  addPlanet(planet) {
    this.planets.push(planet);
  }

  addStar(star) {
    this.stars.push(star);
  }

  getArity() {
    return this.stars.length;
  }

  setSystemLuminosity() {
    let lumos = 0;
    for (let i = 0; i < this.stars.length; i++) {
      lumos += this.stars[i].luminosity;
    }
    this.systemLuminosity = lumos;
  }

  setSystemName (n) {
    this.systemName = n;
  }
}

/* BARYCENTER FUNCTIONS
 *
 */
function getDistanceToBarycenter (primaryMass, secondaryMass, separation) {
  return separation * (secondaryMass / (primaryMass + secondaryMass));
}
