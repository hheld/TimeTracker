/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    EventEmitter  = require('events').EventEmitter,
    merge         = require('object-assign'),
    pdb           = require('../utils/projectsDb');

var _store = {
    from: new Date(2015, 3, 1),
    to: new Date(2015, 3, 1, 18),
    timeBlocks: [],
    projectNames: []
};

function _fetchProjectDataFromDb() {
    pdb.find({ from: _store.from,
              to: _store.to })
        .then(function(res) {
        res.fetch(function(success, error) {
            _store.timeBlocks = success;
            ProjectTimeStore.emitChange();
        });
    });
}

function _fetchAllProjectNamesFromDb() {
    pdb.allProjectNames()
        .then(function(res) {
        _store.projectNames = res;
        ProjectTimeStore.emitChange();
    });
}

var ProjectTimeStore = merge({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    },

    timeBlocks: function() {
        return _store.timeBlocks;
    },

    projectNames: function() {
        return _store.projectNames;
    }
});

ProjectTimeStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case AppConstants.INIT_FROM_DB:
            _fetchProjectDataFromDb();
            _fetchAllProjectNamesFromDb();
            return true;
        default:
        return true;
    }

    ProjectTimeStore.emitChange();

    return true;
});

module.exports = ProjectTimeStore;
