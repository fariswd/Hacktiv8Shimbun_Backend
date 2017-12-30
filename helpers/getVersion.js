const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on('error', function (err) {
    console.log('Error ' + err);
});

const LatestVersion = require('../models/articleVersionModel')

const updateVersion = async () => {
  try {
    const ver = await LatestVersion.find()
    if (ver.length > 0) {
      let latestVersion = await LatestVersion.find()
      await LatestVersion.update({ _id: latestVersion[0]._id }, {
        version: latestVersion[0].version+1
      })
      //clear redis cache
      await client.multi().flushall().execAsync()
      return ({
        msg: 'success add version & clear cache',
        versionNow: latestVersion[0].version+1
      })
    } else {
      let latestVersion = new LatestVersion({version : 0})
      await latestVersion.save()
      return ({
        msg: 'add new latest version',
        versionNow: 0
      })
    }
  } catch (err) {
    console.log(err)
    return ({
      msg: 'cannot update version',
      err: err
    })
  }
}

const checkVersion = async (page) => {
  if(page == undefined) {
    const redisRawVersion = await client.multi().get('latest').execAsync()
    return redisRawVersion[0] != null
  } else {
    const redisRawVersion = await client.multi().get('latest' + page).execAsync()
    return redisRawVersion[0] != null
  }
}

const setCache = async (key, value) => {
  try {
    client.set(key, JSON.stringify(value), redis.print);
    await client.multi().get(key).execAsync()
    return true
  } catch (err) {
    return false
  }
}

const getCache = async (key) => {
  try {
    let articles = await client.multi().get(key).execAsync()
    return articles
  } catch (err) {
    return ({err: err})
  }
}

module.exports = {
  updateVersion,
  checkVersion,
  setCache,
  getCache
};
