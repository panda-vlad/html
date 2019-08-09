const test = require('./test.json');
const Handlebars = require('handlebars');

const source = `<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8" />
      <title>{{name}}</title>
      <script src="scripts/prettify/prettify.js"> </script>
      <script src="scripts/prettify/lang-css.js"> </script>
      <link type="text/css" rel="stylesheet" href="styles/prettify-tomorrow.css">
    <link type="text/css" rel="stylesheet" href="styles/jsdoc-default.css">
   </head>
   <body>
    <div id="main">
     {{name}}
     <div>
     <h4 class="page-title">Description for: </h4>
         <section>
         <header>
            <h2>
            {{#each name}}
            <li> {{this}} </li>
            {{/each}}
            </h2>
        </header>
    
        <article>
            <div class="container-overview">
            <div class="description">This provides method(s)
              {{#each method}}
              {{#ifEquals this "string"}}
              <li> {{json this}} </li>
              {{else}}
                     {{ json this}}
                     <br></br>
                        {{#ife this.type}}
                            
                            {{this.type}}
                            <br></br>
                            'Message for set'
                            <br></br>
                            {{else}}
                            {{this.type}}
                            <br></br>
                        {{/ife}}
              {{/ifEquals}}
              {{/each}}
              </div>
            <div class="description">
            <ul class="people_list">
                {{#each rules}}
                
                {{#ifEquals this "string"}}
                    <li> {{this}} </li>
                    {{else}}
                     {{json this}}
                {{/ifEquals}}
                
                {{/each}}
            </div>
            </div>
        </article>
     <script> prettyPrint(); </script>
    <script src="scripts/linenumber.js"> </script>
   </body>
</html>
`

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (typeof arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ife', function(arg1, options) {
    if(arg1 === 'set') {
        console.log('set')
        return options.fn(this);
    }
    return options.inverse(this);
});

const template = Handlebars.compile(source);

const getRules = (tags) => {
    const rulse = []
   for(const field of Object.keys(test.state)) 
     rulse.push(field +  ':\n',tags.state[field].rules);
   return rulse;
}

const getVerbs = (tags) => {
    const verbs = [];
    for (const field of Object.keys(tags.verbs)) {
        
        const tmp = {...tags.verbs[field].action};
        delete tmp.output
        verbs.push(tags.verbs[field].action.output.split(':')[1], tmp)
    }
    return verbs;
}


Handlebars.registerHelper('json', function(obj) {
    return JSON.stringify(obj);
  });


const data = {
    name: Object.keys(test.state),
    rules: getRules(test),
    method: getVerbs(test)
}

const result = template(data);


const fs = require('fs');
    fs.writeFile("test.html", result, function(err) {
    if(err) {
        return console.log(err);
    }
});