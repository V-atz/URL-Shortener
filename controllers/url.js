const ceateShortId = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const newShortId = ceateShortId();
  await URL.create({
    shortId: newShortId,
    redirectedURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: newShortId });
}

async function handleRedirectURL(req, res) {
  const shortId = req.params.shortId;
  const userEntry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    {
      new: true,
    }
  );
  res.redirect(userEntry.redirectedURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    TotalClicks: result.visitHistory.length,
    Analytics: result.visitHistory,
  });
}

async function handleGetHomePage(req, res) {
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allUrls });
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectURL,
  handleGetAnalytics,
  handleGetHomePage,
};
