var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Event = require('../models').Event;
var Campaign = require('../models').Campaign;
const NetValues = require('../lib/NetValues');

/* GET users listing. */
router.post('/', async (req, res, next) => {
  console.log('session get');


  let data = {};
  //   console.log('req.session.userid:', req.session.user.id);
  if (req.session.user) {
    const root_qey = await Campaign.findAll({
      where: {
        id: req.body.root_id
      }
    });
    const user_qey = await Event.findAll({
      where: {
        root_id: req.body.root_id
      }
    });
    console.log('req:', user_qey);
    data.root_qery = root_qey[0];
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
