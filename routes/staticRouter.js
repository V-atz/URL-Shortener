const express = require("express");
const router = express.Router();
const URL = require('../models/url');
const { handleGetHomePage } = require("../controllers/url");
const {
  handleGoToSignUpPage,
  handleGoToLoginPage,
} = require("../controllers/static");
const { restrictTo } = require("../middlewares/auth");

router.get("/admin/urls", restrictTo(['ADMIN']), async(req, res) => {
  const allUrls = await URL.find({});
  return res.render("home",{
    urls: allUrls,
  })
});
router.get("/",restrictTo(['NORMAL','ADMIN']), handleGetHomePage);
router.get("/signup", handleGoToSignUpPage);
router.get("/login", handleGoToLoginPage);

module.exports = router;
