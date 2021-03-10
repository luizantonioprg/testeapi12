const instaTouch = require('instatouch');
const express = require('express');
const router = express.Router();
const ProxyList = require('free-proxy');
const proxyList = new ProxyList();

router.get('/:id', (req, res) => {
  proxyList
    .get()
    .then(function (proxies) {
      (async () => {
        try {
          const options = { count: 100 };
          const comments = await instaTouch.comments(req.params.id, options);
          res.setHeader('Access-Control-Allow-Origin', '*');
          return res.send(comments);
        } catch (error) {
          console.log(error);
        }
      })();
    })
    .catch(function (error) {
      throw new Error(error);
    });
});

router.get('/', (req, res) => {
  res.send('Olá bem -vindo');
});

module.exports = router;
