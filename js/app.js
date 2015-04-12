/* jshint node: true */
/* global document */

var React             = require('react'),
    AppControllerView = require('./components/AppControllerView');

React.render(
    <AppControllerView></AppControllerView>,
    document.getElementById('mount-point')
);

