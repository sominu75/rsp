var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('respond with a resource');
  
  let data = {};
  if(req.body.id == 'root' && req.body.pw == 'root'){
    if(req.session.user){
    } else {
        req.session.user = {id: req.body.id};
        console.log('1 req.session.id:', req.session.user.id);
    }
    console.log('2 req.session.user.id:', req.session.user.id);
    data.res = 1;
    res.send(data);
  } else {
    data.res = 0;
    res.send(data);
  }
});

module.exports = router;
