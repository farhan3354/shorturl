const Url = require("../models/url");
const shortid = require("short-id");

async function handleshorturl(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ message: "Enter a valid URL." });
  }

  const short = shortid.generate();

  await Url.create({
    shortId: short,
    redirecturl: body.url,
    visiturl: [],
  });

  return res.json({
    message: "Short URL created successfully!",
    shortUrl: `http://localhost:4000/url/${short}`,
  });
}

async function handleRedirect(req, res) {
 
    const shortId = req.params.shortId;

  const entry = await Url.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visiturl: { timestamp: Date.now() },
      },
    }
  );

  if (!entry) {
    return res.status(404).send(" Short URL not found.");
  }

  return res.redirect(entry.redirecturl);
}

async function handleanali(req, res) {
  const shortId = req.params.shortId;

  const result = await Url.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ message: "Short URL not found" });
  }

  return res.json({
    totalVisits: result.visiturl.length,
    analytics: result.visiturl,
  });
}

module.exports = {
  handleshorturl,
  handleanali,
  handleRedirect,
};
