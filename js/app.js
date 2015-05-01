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
    name: 'P 1',
    from: new Date(2015, 3, 1, 8, 0),
    to: new Date(2015, 3, 1, 11, 30)
};

var p2 = {
    name: 'P 2',
    from: new Date(2015, 3, 1, 12, 30),
    to: new Date(2015, 3, 1, 17, 0)
};

pdb.upsert(p1)
    .then(function() {
    console.log('Done upserting p1');

    pdb.find({from: new Date(2015, 3, 1),
              to: new Date(2015, 4, 1)})
        .then(function(res) {
        res.fetch(function(success, error) {
            console.log(success, error);
        });
    });
});

pdb.upsert(p2)
    .then(function() {
    console.log('Done upserting p2');
});
