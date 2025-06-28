const express = require("express");
const route = express.Router();
const app = express();
const homeDatas = require("../models/homeModel");
const aboutDatas = require("../models/aboutModel");
const backgroundDatas = require("../models/backgroundModel");
const skillDatas = require("../models/skillModel");
const contactCollection = require("../models/contactModel");
const projectCollection = require("../models/projectsModel");
const contactContentCollection = require("../models/contactContentModel");
const multer = require("multer");
require("dotenv").config();

const upload = multer(); 
const publicUrl = process.env.BASE_URL;
route.post("/home", async (req, res) => {
  const datas = await homeDatas.findOne({});
  const toSend = {
    name: datas?.name,
    roles: datas?.roles,
    resume: datas?.resume && `${publicUrl + "/uploads/" + datas?.resume}`,
  };
  if (datas) {
    res.json({
      status: "success",
      data: toSend,
    });
  } else {
    res.json({
      status: "success",
      message: "datas not found",
    });
  }
});

route.post("/about", async (req, res) => {
  const datas = await aboutDatas.findOne({});
  const toSend = {
    pageTitle: datas?.pageTitle,
    leftImage:
      datas?.leftimage && `${publicUrl + "/uploads/" + datas?.leftimage}`,
    keys: datas?.keys,
    subparagraph: datas?.subparagraph,
    title: {
      title_one: datas?.title_one,
      title_two: datas?.title_two,
      title_three: datas?.title_three,
    },
    paragraph: {
      paragraph_one: datas?.paragraph_one,
      paragraph_two: datas?.paragraph_two,
      paragraph_three: datas?.paragraph_three,
    },
  };
  if (datas) {
    res.json({
      status: "success",
      data: toSend,
    });
  } else {
    res.json({
      status: "success",
      message: "datas not found",
    });
  }
});

route.post("/background", async (req, res) => {
  const datas = await backgroundDatas.find({});

  const education_datas = [];
  const work_datas = [];

  if (datas && datas.length > 0) {
    const education = datas.filter((item) => item.backgroundType != 1);
    education.forEach((item) =>
      education_datas.push({
        designation: item?.designation,
        organisation: item?.organisation,
        description: item?.description,
        from: item?.fromDate,
        to: item?.toDate,
      })
    );
    const work = datas.filter((item) => item.backgroundType == 1);
    work.forEach((item) =>
      work_datas.push({
        designation: item?.designation,
        organisation: item?.organisation,
        description: item?.description,
        from: item?.fromDate,
        to: item?.toDate,
      })
    );
  }
  if (work_datas || education_datas) {
    const toSend = {
      pageTitle: datas?.pageTitle,
      work_datas,
      education_datas,
    };
    res.json({
      status: "success",
      data: toSend,
    });
  } else {
    res.json({
      status: "success",
      message: "datas not found",
    });
  }
});


route.post("/skills", async (req, res) => {
  const datas = await skillDatas.find({});

  const skills = [];

  if (datas && datas.length > 0) {
    datas.forEach(item => skills.push({
        skill:item?.skill,
        icon:  item?.image &&  `${publicUrl + '/uploads/' + item?.image}`,
        description : item?.description
    }))
  } 
  if (skills) {
    const toSend = {
      pageTitle: datas?.pageTitle,
      skills,
    };
    res.json({
      status: "success",
      data: toSend,
    });
  } else {
    res.json({
      status: "success",
      message: "datas not found",
    });
  }
});

route.post("/projects", async (req, res) => {
  const datas = await projectCollection.find({});

  const projects = [];

  if (datas && datas.length > 0) {
    datas.forEach((item) =>
      projects.push({
        name: item?.projectName,
        url: item?.projectUrl,
        image: item?.image && `${publicUrl + "/uploads/" + item?.image}`,
        description: item?.description,
      })
    );
  }
  if (projects) {
    const toSend = {
      projects,
    };
    res.json({
      status: "success",
      data: toSend,
    });
  } else {
    res.json({
      status: "success",
      message: "datas not found",
    });
  }
});


route.post('/contact',async(req,res) => {
 const datas = await contactContentCollection.findOne({}).lean()
 if (datas) {
   const toSend = {
     email:datas?.email,
     mobile:datas?.mobile,
     address:datas?.address,
   };
   res.json({
     status: "success",
     data: toSend,
   });
 } else {
   res.json({
     status: "success",
     message: "datas not found",
   });
 }

})



route.post('/enquiry',upload.none(),async (req,res) => {
    const enquirydetails = {
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      purpose: req.body.purpose,
      message: req.body.message,
    };
    if (Object.keys(req.body).length == 5) {
      if (enquirydetails) {
        await contactCollection.insertOne(enquirydetails)
        res.json({
          status: "success",
          message: 'Your message is sended!!!',
        });
      }
    } else {
      res.json({
        status: "error",
        message: 'something went wrong!!!',
      });
    }
})
module.exports = route;
