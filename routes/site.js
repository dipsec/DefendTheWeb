exports.index = function(req, res){
  res.render('index', { title: 'Defend the Web', extra: { classes: 'home', scripts: ['https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js', '/js/splash.min.js'] } });
};