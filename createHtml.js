const test = require('./test.json');
const config = require('./config');
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
                {{{this}}}
              {{/each}}
              </div>
            <div class="description">
            <ul class="people_list">
            Rules for:
            {{#each rules}}
                {{{this}}}
            {{/each}}
            </div>
            </div>
        </article>
     <script> prettyPrint(); </script>
    <script src="scripts/linenumber.js"> </script>
   </body>
</html>
`;

const template = Handlebars.compile(source);

const getRules = (tags) => {
  const rulse = [];
  for (const field of Object.keys(test.state))
    rulse.push(`<li> ${field}: ${JSON.stringify(tags.state[field].rules)}</li>`);
  return rulse;
};

const getVerbs = (tags) => {
  const verbs = [];
  
  // for (const field of Object.keys(tags.verbs)) {

  //     const tmp = {...tags.verbs[field].action};
  //     delete tmp.output
  //     verbs.push(tags.verbs[field].action.output.split(':')[1], tmp)
  // }
  for (const field of Object.keys(tags.verbs)) {
    let description = null;
    const stateField = `<li>${field}</li>`;
    const tmp = {...tags.verbs[field].action};
    delete tmp.output
    switch (tags.verbs[field].action.type) {
      case 'set':
        description = config.set;
        break;
      case 'decrease':
        description = config.decrease;
      case 'increase':
        description = config.increase;
    }
    verbs.push('<br></br>',stateField, tags.verbs[field].action.output.split(':')[1],':', JSON.stringify(tmp), `<br>${description}</br>`);
  }
  return verbs;
};


const data = {
  name: Object.keys(test.state),
  rules: getRules(test),
  method: getVerbs(test)
};

const result = template(data);


const fs = require('fs');
fs.writeFile('test.html', result, (err) => {
  if (err) {
    return console.log(err);
  }
});
