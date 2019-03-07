var express = require('express');
var router = express.Router();
var path = require('path');
var User = require('../models').User;
var Event = require('../models').Event;
var sequelize = require('../models').sequelize;
const NetValues = require('../lib/NetValues');
var moment = require('moment');
var AWS = require("aws-sdk");
AWS.config.loadFromPath("./config/awsconfig.json");
var s3 = new AWS.S3();
var multerS3 = require('multer-s3');
var moment = require('moment');



/* module */
var multer = require('multer');
var fs = require('fs');

var uploads = multer({
  storage: multerS3({
    s3: s3,
    bucket: "minuapp.com.rsp/event_images",
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

        const event_qery = await Event.count({
          where: {
            root_id: req.body.root_id
          }
        });
        let event_count = event_qery;

        console.log('event_qery:', event_qery);
        console.log('event_count:', event_count);
        if (event_count == 0) {
          await Event.create({
            admin_id: req.session.user.id,
            root_id: req.body.root_id,
            event_name: req.body.event_name,
            bong: parseInt(req.body.bong),
            winner: parseInt(req.body.winner),
            start_time: parseInt(req.body.start_time),
            youtube_url: req.body.youtube_url,
            youtube_time: parseInt(req.body.youtube_time),
            email_content: req.body.email_content,
            image_name: req.file.key,
            root_view: 1,
            time: moment().valueOf()
          });
        } else {
          await Event.create({
            admin_id: req.session.user.id,
            root_id: req.body.root_id,
            event_name: req.body.event_name,
            bong: parseInt(req.body.bong),
            winner: parseInt(req.body.winner),
            start_time: parseInt(req.body.start_time),
            youtube_url: req.body.youtube_url,
            youtube_time: parseInt(req.body.youtube_time),
            email_content: req.body.email_content,
            image_name: req.file.key,
            time: moment().valueOf()
          });
        }
        console.log('Event.create 2');
      } else if (req.body.add_id == NetValues.UPDATE_DB) {
        if (req.file != null) {
          const event_qey = await Event.findAll({
            where: {
              id: req.body.id
            }
          });
          delectImage('event_images/' + event_qey[0].image_name);
          console.log('req:', event_qey[0].image_name);
          const qery = await Event.update({
            event_name: req.body.event_name,
            bong: parseInt(req.body.bong),
            winner: parseInt(req.body.winner),
            start_time: parseInt(req.body.start_time),
            youtube_url: req.body.youtube_url,
            youtube_time: parseInt(req.body.youtube_time),
            email_content: req.body.email_content,
            image_name: req.file.key
          }, {
            where: {
              id: req.body.id
            }
          });
        } else {
          const qery = await Event.update({
            event_name: req.body.event_name,
            bong: parseInt(req.body.bong),
            winner: parseInt(req.body.winner),
            start_time: parseInt(req.body.start_time),
            youtube_url: req.body.youtube_url,
            youtube_time: parseInt(req.body.youtube_time),
            email_content: req.body.email_content
          }, {
            where: {
              id: req.body.id
            }
          });
        }
      } else if (req.body.add_id == NetValues.DELETE_DB) {
        const user_qey = await Event.destroy({
          where: {
            id: req.body.id
          }
        });
        delectImage('event_images/' + req.body.image_name);
      }
      data.res = NetValues.REQ_OK;
      res.send(data);
    } catch (e) {
      console.log('fb error:', e);
      if (req.body.add_id == NetValues.ADD_DB) {
        if (req.file != null) {
          delectImage('event_images/' + req.file.key);
        }
      }
      data.res = NetValues.REQ_DB_ERROR;
      res.send(data);
    }
  } else {
    if (req.body.add_id == NetValues.ADD_DB) {
      if (req.file != null) {
        delectImage('event_images/' + req.file.key);
      }
    }
    data.res = NetValues.REQ_LOGOUT;
    res.send(data);
  }
});

module.exports = router;
