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
            db.projects.findOne({ name: project.name, from: project.from, to: project.to }, {}, function(res) {
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

module.exports = {
    upsert: upsertProject
};
