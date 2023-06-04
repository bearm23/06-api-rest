const characterMiddleware = (req, res, next) => {
  if (req.method === 'POST') {
    req.body = {
      ...req.body,
      image: 'http://localhost:3000/thumbnails/new-character.png',
    };
  }
  next();
};

module.exports = (req, res, next) => {
  if (req.path === '/characters') {
    characterMiddleware(req, res, next);
  } else {
    next();
  }
};
