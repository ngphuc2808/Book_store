const { engine } = require('express-handlebars');
const hbs_sections = require('express-handlebars-sections');
module.exports = function(app) {
    app.engine('hbs', engine({ 
        extname: '.hbs', 
        defaultLayout: "Main",
        layoutsDir: 'views/layouts',
        partialsDir: 'views/partials',
        helpers: {
          section: hbs_sections()
        }
      }));
      
    app.set('view engine', 'hbs');
}