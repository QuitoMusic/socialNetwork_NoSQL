const router = require('express').Router();
const apiRoutes = require('./api/index');

router.use('/api', apiRoutes);

router.use((req, res) => {
  return res.send('Route not found');
});

module.exports = router;