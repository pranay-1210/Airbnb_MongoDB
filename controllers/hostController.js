const Home = require("./../models/Home");

exports.getAddHome = (req, res) => {
  res.render("host/edit-home", {
    editing: false,
    pagetTitle: "Host Your Home",
  });
};

exports.getEditHome = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  if (!editing) {
    console.log("Editing flag not set properly");
    return res.redirect("/host/host-homes");
  }

  Home.findById(homeId).then(([homes]) => {
    const home = homes[0];
    if (!home) {
      console.log("Home not found for editing");
      return res.redirect("/host/host-homes");
    }
    console.log(homeId, editing, home);
    res.render("host/edit-home", {
      home: home,
      editing: editing,
      pagetTitle: "Edit your Home",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  // console.log(req.body);
  const { houseName, price, location, rating, photoUrl, description } = req.body;
  const newHome = new Home(houseName, price, location, rating, photoUrl, description );

  newHome.save().then(([rows]) => {
      res.render("host/home-added", { pagetTitle: "Home Hosted" });
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) => {
    res.render("host/host-homes", {
      homes: registeredHomes,
      pagetTitle: "Host Homes",
    });
  });
};

exports.postEditHome = (req, res, next) => {
  const { id, houseName, price, location, rating, photoUrl, description  } = req.body;
  const newHome = new Home(houseName, price, location, rating, photoUrl, description );
  newHome.id = id;
  newHome.save((error) => {
    if (error) {
      console.log("Error while updating home", error);
    } else {
      console.log("Updated home:", newHome);
      res.redirect("/host/host-homes");
    }
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Came to delete ", homeId);
  Home.deleteById(homeId).then(() => {
    res.redirect("/host/host-homes");
});
};

  