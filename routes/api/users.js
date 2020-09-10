const router = require('express').Router();
const usersController = require('../../controllers/usersController');

router.route('/login').post(usersController.create);

router
  .route('/:id')
  .get(usersController.findBySteamID)
  .put(usersController.update)
  .delete(usersController.remove);

module.exports = router;
