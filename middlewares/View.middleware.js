const { engine } = require('express-handlebars');
module.exports = function(app) {
    app.engine('hbs', engine({ 
        extname: '.hbs', 
        defaultLayout: "Main",
        layoutsDir: 'views/layouts',
        partialsDir: 'views/partials'
      }));
      
    app.set('view engine', 'hbs');
}