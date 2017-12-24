const welcomePage = (req, res) => {
  res.json({
    status: 'ok',
    apiVer: '1.0.0'
  })
}

module.exports = {
  welcomePage
};
