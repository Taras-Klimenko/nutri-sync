const router = require('express').Router();

router.get('*', (req, res) =>
  res.sendFile('index.html', {
    root: '../../nutri-sync/server/public/dist',
  })
);

module.exports = router;
