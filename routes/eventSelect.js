var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Event = require('../models').Event;
const NetValues = require('../lib/NetValues');

/* GET users listing. */
router.post('/', async (req, res, next) => {
  console.log('session get');


  let data = {};
  //   console.log('req.session.userid:', req.session.user.id);
  if (req.session.user) {
    await Event.update({
      root_view: 0
    }, {
      where: {
        root_id: req.body.root_id
      }
    });
    await Event.update({
      root_view: 1
    }, {
      where: {
        id: req.body.id
      }
    });
    const user_qey = await Event.findAll({
      where: {
        root_id: req.body.root_id
      }
    });
    console.log('req:', user_qey);
    data.qery = user_qey;
    data.level = req.session.user.level;
    data.res = NetValues.REQ_OK;
    res.send(data);
  } else {
    data.res = NetValues.REQ_LOGOUT;
    res.send(data);
  }
});

module.exports = router;
