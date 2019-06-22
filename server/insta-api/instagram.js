const Instagram = require('instagram-web-api')
// const FileCookieStore = require('tough-cookie-filestore2')
// const cookies =require('./../cookies')
// const cookieStore = new FileCookieStore('./cookies.json')
const FirebaseDB = require('./../firebasedb/firebase-db.js')
const firebaseDB = new FirebaseDB

class Insta {
  constructor() {
    this.client = null;
  }

  async loginInsta(username, password) {
    this.client = new Instagram({username, password})
    this.loginUser = await this.client.login()
    if (this.loginUser.status === 'ok') {
      firebaseDB.loginFB({username, password,id:this.loginUser.userId,token:this.loginUser.fr})
      return this.loginUser
    } else {
      return {status: "Login Error"}
    }
  }
  async logout() {
    this.client =null
    // await client.logout() // GET token on error
    return {status:200}
  }
  async uploadPhoto(photo_url,content) {
    try {
      return await this.client.uploadPhoto({photo:photo_url,caption:content})
    } catch (e) {
      return {e}
    }
  }
  async uploadStory(photo_url,content) {
    try {
      return await this.client.uploadStory({photo:photo_url,caption:content})
    } catch (e) {
      return {e}
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
  async search(query,context) {
    try {
      if (query) {
        // console.log('search',{ query,context,cookies:cookies["instagram.com"]["/"].csrftoken.value});
        return await this.client.search({ query,context})
      } else return {error: 'search query is require'}
    } catch (e) {
      return {e}
    }
  }
  async getPhotosByHashtag(hashtag) {
    try {
      if (hashtag) {
        return await this.client.getMediaFeedByHashtag({ hashtag})
      } else return {error: 'hashtag is require'}
    } catch (e) {
      return {e}
    }
  }
  async like(mediaId) {
    try {
      if (mediaId) {
        return await this.client.like({ mediaId})
      } else return {error: 'mediaId is require'}
    } catch (e) {
      return {e}
    }
  }
  async follow(userId) {
    try {
      if (userId) {
        return await this.client.follow({ userId})
      } else return {error: 'userId is require'}
    } catch (e) {
      return {e}
    }
  }
  async getFollowers(userId) {
    try {
      if (userId) {
        return await this.client.getFollowers({ userId})
      } else return {error: 'userId is require'}
    } catch (e) {
      return {e}
    }
  }
  async getFollowings(userId) {
    try {
      if (userId) {
        return await this.client.getFollowings({ userId})
      } else return {error: 'userId is require'}
    } catch (e) {
      return {e}
    }
  }
  async getHome() {
    try {
        return await this.client.getHome(this.client.fr)
    } catch (e) {
      return {e}
    }
  }
  async getUser(username) {
    try {
      if(username){
        return await this.client.getUserByUsername({ username})
      } else return {error: 'username is require'}
      return await this.client.getHome()
    } catch (e) {
      return {e}
    }
  }

}

module.exports = Insta