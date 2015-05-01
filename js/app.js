/* jshint node: true */
/* global document */

var React             = require('react'),
    AppControllerView = require('./components/AppControllerView'),
    AppActions        = require('./actions/AppActions');

AppActions.initFromDb();

React.render(
    <AppControllerView></AppControllerView>,
    document.getElementById('mount-point')
);
