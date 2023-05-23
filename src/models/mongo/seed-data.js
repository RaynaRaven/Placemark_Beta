export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      isSeed: true,
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      isSeed: true,
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      isSeed: true,
    }
  },
  categories: {
    _model: "Category",
    cheap_eats: {
      name: "Cheap Eats",
      isSeed: true,
      userid: "->users.bart"
    }
  },
  locations: {
    _model : "Location",
    billyBunters : {
      name: "Billy Bunters",
      description: "best fish box in town",
      latitude: 52.83589902444309,
      longitude: -6.915504901522804,
      isSeed: true,
      categoryId: "->categories.cheap_eats"
    },
  }
};