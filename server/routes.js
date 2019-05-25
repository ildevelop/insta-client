const express = require("express")
const router = express.Router()
// const FileCookieStore = require('tough-cookie-filestore2')
// const cookieStore = new FileCookieStore('./cookies.json')

const Insta = require('./instagram')
let User = new Insta
router.get('/test', (req, res) => {
  res.send("test HERE")
});
router.post('/get-login', async (req, res) => {
  const {username, password} = req.body
  const login = await User.loginInsta(username, password)
  res.send(login)
});
router.post('/get-profile', async (req, res) => {
  res.send(await User.getProfile())
});
router.post('/get-activity', async (req, res) => {
  //Get activity of account, news following, liked, etc.
  res.send(await User.getActivity())
});
router.post('/add-comment', async (req, res) => {
  //Add comment to a media item.
  const {id, text} = req.body;
  res.send(await User.addComment(id, text))
});
router.post('/get-media-shortcode', async (req, res) => {
  //Get data of a media by the Instagram shortcode
  const {shortcode} = req.body;
  res.send(await User.getMediaByShortcode(shortcode))
});
router.post('/get-photos-hashtag', async (req, res) => {
  //Get photos for hashtag
  const {hashtag} = req.body;
  res.send(await User.getPhotosByHashtag(hashtag))
});

module.exports = router;