// import other routes
const locationRoutes = require('./locations');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('welcome to the development api-server');
    });

    // // other routes
    locationRoutes(app, fs);

};

module.exports = appRouter;