const Context = require('tingle-context');
const Demo = require('./demo');
require('fastclick').attach(document.body);

React.render(<Demo/>, document.getElementById('TingleDemo'));