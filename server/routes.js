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
router.post('/search', async (req, res) => {
  //Search users, places, or hashtags
  const {query,context} = req.body;
  res.send(await User.search(query,context))
});
router.post('/get-feed', async (req, res) => {
  //Get home feed timeline, media shared by the people you follow
  const {feedId} = req.body;
  res.send(await User.getHome(feedId))
});
router.post('/get-user', async (req, res) => {
  //Get user by username, this method not require authentication for public profiles.
  const {username} = req.body;
  res.send(await User.getUser(username))
});
router.post('/like', async (req, res) => {
  const {mediaId} = req.body;
  res.send(await User.like(mediaId))
});
router.post('/follow', async (req, res) => {
  const {userId} = req.body;
  res.send(await User.follow(userId))
});
router.post('/get-followers', async (req, res) => {
  const {userId} = req.body;
  res.send(await User.getFollowers(userId))
});
router.post('/get-followings', async (req, res) => {
  const {userId} = req.body;
  res.send(await User.getFollowings(userId))
});
router.post('/logout', async (req, res) => {
  res.send(await User.logout())
});
router.post('/upload-photo', async (req, res) => {
  const {photo_url,content} = req.body;
  res.send(await User.uploadPhoto(photo_url,content))
});
router.post('/upload-story', async (req, res) => {
  const {photo_url,content} = req.body;
  res.send(await User.uploadStory(photo_url,content))
});


module.exports = router;