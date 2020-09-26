const router = require('express').Router();
const usersController = require('../../controllers/usersController');

router
  .route('/')
  .post((req, res) => {
    usersController.addToFavorites(req, res);
  })
  .put((req, res) => {
    usersController.deleteFromFavorites(req, res);
  });

//I think my server file is sending my static html file on the app.get('*') route.
//that's why there's a post for a get route
router.route('/:steamID').post((req, res) => {
  console.log('get favorites route called');
  usersController.getFavorites(req, res);
});
router.route;

module.exports = router;
