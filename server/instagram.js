const Instagram = require('instagram-web-api')

class Insta {
  constructor() {
    this.client = null;
  }

  async loginInsta(username, password) {
    this.client = new Instagram({username, password})
    this.loginUser = await this.client.login()
    console.log({user: this.loginUser});
    if (this.loginUser.status === 'ok') {
      return this.loginUser
    } else {
      return {status: "Login Error"}
    }
  }

  async getProfile() {
    try {
      return await this.client.getProfile()
    } catch (e) {
      return {e}
    }
  }

  async getActivity() {
    try {
      return await this.client.getActivity()
    } catch (e) {
      return {e}
    }
  }

  async addComment(id, text) {
    try {
      if (id && text) {
        return await this.client.addComment({mediaId: id, text})
      } else return {error: 'ID and comment is require'}
    } catch (e) {
      return {e}
    }
  }
  async getMediaByShortcode(shortcode) {
    try {
      if (shortcode) {
        return await this.client.getMediaByShortcode({ shortcode})
      } else return {error: 'shortcode is require'}
    } catch (e) {
      return {e}
    }
  }
  async getPhotosByHashtag(hashtag) {
    //TODO something error
    try {
      if (hashtag) {
        return await this.client.getPhotosByHashtag({ hashtag})
      } else return {error: 'hashtag is require'}
    } catch (e) {
      return {e}
    }
  }


}

module.exports = Insta