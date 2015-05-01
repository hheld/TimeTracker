/* jshint node: true */

var minimongo = require('minimongo');

var IndexedDb = minimongo.IndexedDb;

function init() {
    return new Promise(function(resolve, reject) {
        new IndexedDb({namespace: 'projects'}, function(db) {
            db.addCollection('projects', function() {
                resolve(db);
            });
        });
    });
}

function upsertProject(project) {
    return new Promise(function(resolve, reject) {
        init().then(function(db) {
            db.projects.findOne({ project: project.project, from: project.from, to: project.to }, {}, function(res) {
                if(res) {
                    project._id = res._id;
                }

                db.projects.upsert(project, function() {
                    resolve();
                });
            });
        });
    });
}

function find(query) {
    return new Promise(function(resolve, reject) {
        init().then(function(db) {
            resolve(db.projects.find({ from: { $gt: query.from, $lt: query.to },
                                       to:   { $gt: query.from, $lt: query.to } }));
        });
    });
}

function allProjectNames() {
    return new Promise(function(resolve, reject) {
        init().then(function(db) {
            var allProjectNames = [];

            db.projects.find({}, { project: 1 }).fetch(function(success, error) {
                for(var i=0, len=success.length; i<len; ++i) {
                    allProjectNames.push(success[i].project);
                }

                resolve(allProjectNames);
            });
        });
    });
}

module.exports = {
    upsert: upsertProject,
    find: find,
    allProjectNames: allProjectNames
};
