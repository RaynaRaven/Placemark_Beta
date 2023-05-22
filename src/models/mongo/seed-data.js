export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  categories: {
    _model: "Category",
    mozart: {
      title: "Cheap Eats",
      userid: "->users.bart"
    }
  },
  locations: {
    _model : "Location",
    track_1 : {
      name: "Billy Bunters",
      description: "best fish box in town",
      // location: "52.83589902444309, -6.915504901522804",
      latitude: 52.83589902444309,
      longitude: -6.915504901522804,
      categoryId: "->categories.cheap_eats"
    },
  }
};