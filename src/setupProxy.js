const { createProxyMiddleware } = require('http-proxy-middleware');
     
module.exports = function(app) {
    app.use(createProxyMiddleware('/api', { target: 'https://serene-everglades-41183.herokuapp.com' }));
};