export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About myPOI",
      };
      return h.view("about-view", viewData);
    },
  },
};
