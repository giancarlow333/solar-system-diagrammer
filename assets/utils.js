class Star {
  constructor (name, luminosity) {
    this.name = name;
    this.luminosity = luminosity;
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

class StarSystem extends Star {
  constructor(name, luminosity) {
    super(name, luminosity); // a Star object
    this.planets = [];
  }

  addPlanet(planet) {
    this.planets.push(planet);
  }

  addStar(star) {
    this.name = star.name;
    this.luminosity = star.luminosity;
  }
}
