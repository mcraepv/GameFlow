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

router.route('/:steamID').get((req, res) => {
  console.log('get favorites route called');
  usersController.getFavorites(req, res);
});
router.route;

module.exports = router;
