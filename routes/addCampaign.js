var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models').User;
var Campaign = require('../models').Campaign;
var Event = require('../models').Event;
var sequelize = require('../models').sequelize;
const NetValues = require('../lib/NetValues');
var moment = require('moment');
var AWS = require("aws-sdk");
AWS.config.loadFromPath("./config/awsconfig.json");
var s3 = new AWS.S3();
var multerS3 = require('multer-s3');



/* module */
var multer = require('multer');
var fs = require('fs');

var uploads = multer({
  storage: multerS3({
    s3: s3,
    bucket: "minuapp.com.rsp/campaign_images",
    key: function(req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
      console.log('file');
    },
    acl: 'public-read-write',
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});
var delectImage = function(item) {
  s3.deleteObject({
    Bucket: 'minuapp.com.rsp',
    Key: item
  }, function(err, data) {

  })
};
/* GET users listing. */
router.post('/', uploads.single('log_image'), async (req, res, next) => {
  console.log('req.file:', req.file);
  let data = {};
  //   console.log('req.session.userid:', req.session.user.id);
  if (req.session.user) {
    try {
      if (req.body.add_id == NetValues.ADD_DB) {

        await Campaign.create({
          admin_id: req.session.user.id,
          client_name: req.body.client_name,
          title: req.body.title,
          participant: req.body.participant,
          image_name: req.file.key,
          time: req.body.time
        });
        console.log('Campaign.create 2');
      } else if (req.body.add_id == NetValues.UPDATE_DB) {
        if (req.file != null) {
          const campaign_qey = await Campaign.findAll({
            where: {
              id: req.body.id
            }
          });
          delectImage('campaign_images/' + campaign_qey[0].image_name);
          console.log('req:', campaign_qey[0].image_name);
          const qery = await Campaign.update({
            client_name: req.body.client_name,
            title: req.body.title,
            participant: req.body.participant,
            image_name: req.file.key,
            time: req.body.time
          }, {
            where: {
              id: req.body.id
            }
          });
        } else {
          const qery = await Campaign.update({
            client_name: req.body.client_name,
            title: req.body.title,
            participant: req.body.participant,
            time: req.body.time
          }, {
            where: {
              id: req.body.id
            }
          });
        }
      } else if (req.body.add_id == NetValues.DELETE_DB) {
        const child_qey = await Event.findAll({
          where: {
            root_id: req.body.id
          }
        });
        console.log('length:', child_qey.length);
        for(let i = 0; i < child_qey.length; ++i){
        console.log('name:', child_qey[0].image_name);
          delectImage('event_images/' + child_qey[i].image_name);
        }
        await Event.destroy({
          where: {
            root_id: req.body.id
          }
        });
        const user_qey = await Campaign.destroy({
          where: {
            id: req.body.id
          }
        });
        delectImage('campaign_images/' + req.body.image_name);
      }
      data.res = NetValues.REQ_OK;
      res.send(data);
    } catch (e) {
      console.log('fb error:', e);
      if (req.body.add_id == NetValues.ADD_DB) {
        if (req.file != null) {
          delectImage('campaign_images/' + req.file.key);
        }
      }
      data.res = NetValues.REQ_DB_ERROR;
      res.send(data);
    }
  } else {
    if (req.body.add_id == NetValues.ADD_DB) {
      if (req.file != null) {
        delectImage('campaign_images/' + req.file.key);
      }
    }
    data.res = NetValues.REQ_LOGOUT;
    res.send(data);
  }
});

module.exports = router;
