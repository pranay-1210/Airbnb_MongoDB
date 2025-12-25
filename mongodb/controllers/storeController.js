const Home = require("./../models/Home");
const Favourite = require("../models/Favourite");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/index", {
      homes: registeredHomes,
      pagetTitle: "Our Airbnb",
    });
  });
};

exports.getHomes = (req, res, next) => {
    Home.fetchAll().then(([registeredHomes]) => {
    res.render("store/homes", {
      homes: registeredHomes,
      pagetTitle: "Our Airbnb",
    });
  });
};

exports.getFavourites = (req, res, next) => {
  Favourite.fetchAll((favouriteIds) => {
      Home.fetchAll().then(([registeredHomes]) => {
      const favouriteHomes = registeredHomes.filter(home => favouriteIds.includes(home.id));
      res.render("store/favourites", {
        homes: favouriteHomes,
        pagetTitle: "Favourites",
      });
    });
  })
}

exports.postAddFavourites = (req, res, next) => {
  // console.log("Came to add favourites",req.body);
  const homeId = req.body.id;
  Favourite.addToFavourites(homeId, (error) => {
    if (error) {
      console.log("Error while adding to favourites", error);
    }
    res.redirect("/favourites");
  });
};

exports.postDeleteFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error => {
    if (error) {
      console.log("Error while deleting from favourites", error);
    }
    res.redirect("/favourites");
  });
}
  

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeIdentity;
  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log("Home not found");
      return res.redirect("/homes");
    }
    res.render("store/home-detail", { home: home, pagetTitle: "Home Detail" });
  });
};
