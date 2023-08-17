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
  }
}

class StarSystem extends Star {
  constructor(name, luminosity) {
    super(name, luminosity); // a Star object
    this.planets = [];
  }

  addPlanet(planet) {
    planets.push(planet);
  }

  addStar(star) {
    this.name = star.name;
    this.luminosity = star.luminosity;
  }
}
