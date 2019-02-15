var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('respond with a resource');
  
  let data = {};
//   console.log('req.session.userid:', req.session.user.id);
    if(req.session.user){
        data.res = 1;
        // req.session.destroy(function(){
        //     req.session;
        //     res.send(data);
        // });
        res.send(data);
    } else {
        req.session.user = {id: 'root'};
        data.res = 0;
        res.send(data);
    }
});

module.exports = router;
