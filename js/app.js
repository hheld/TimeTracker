/* jshint node: true */
/* global document */

var React             = require('react'),
    AppControllerView = require('./components/AppControllerView');

React.render(
    <AppControllerView></AppControllerView>,
    document.getElementById('mount-point')
);

var pdb = require('./utils/projectsDb');

var p1 = {
    project: 'P 1',
    from: new Date(2015, 3, 1,  8,  0),
    to:   new Date(2015, 3, 1, 11, 30)
};

var p2 = {
    project: 'P 2',
    from: new Date(2015, 3, 1, 12, 30),
    to:   new Date(2015, 3, 1, 17,  0)
};

pdb.upsert(p1);
pdb.upsert(p2);

pdb.find({ from: new Date(2015, 3, 1),
           to:   new Date(2015, 3, 1, 16) })
    .then(function(res) {
    res.fetch(function(success, error) {
        console.log('Found within time range', success);
    });
});

pdb.allProjectNames()
    .then(function(res) {
    console.log('All project names', res);
});
