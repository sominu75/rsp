var express = require('express');
var router = express.Router();
var User = require('../models').User;
var sequelize = require('../models').sequelize;
const NetValues = require('../lib/NetValues');
var moment = require('moment');

/* GET users listing. */
router.post('/', async (req, res, next) => {
  console.log('session get');

  let data = {};
  //   console.log('req.session.userid:', req.session.user.id);
  if (req.session.user) {
    if (req.session.user.level == 1) {
      try {
        if (req.body.add_id == NetValues.ADD_DB) {
          const user_qey = await User.findAll({
            where: {
              name: req.body.id
            }
          });
          if (user_qey.length != 0) {
            data.res = NetValues.REQ_NOT_IS_ID;
            res.send(data);
          } else {

            await User.create({
              name: req.body.id,
              password: req.body.pw,
              level: 3,
              time: moment().valueOf()
            });
          }
        } else if (req.body.add_id == NetValues.UPDATE_DB) {
          const user_qey = await User.update({password:req.body.pw},
            {
            where: {
              name: req.body.id
            }
          });
        } else if (req.body.add_id == NetValues.DELETE_DB) {
          const user_qey = await User.destroy(
            {
            where: {
              name: req.body.id
            }
          });
        }
        data.res = NetValues.REQ_OK;
        res.send(data);
      } catch (e) {
        data.res = NetValues.REQ_DB_ERROR;
        res.send(data);
      }
    } else {
      data.res = NetValues.REQ_NO;
      res.send(data);
    }
  } else {
    data.res = NetValues.REQ_LOGOUT;
    res.send(data);
  }
});

module.exports = router;
