/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    EventEmitter  = require('events').EventEmitter,
    merge         = require('object-assign'),
    pdb           = require('../utils/projectsDb'),
    moment        = require('moment');

var _store = {
    from: moment().startOf('day').toDate(),
    to: moment().endOf('day').toDate(),
    timeBlocks: [],
    projectNames: []
};

function _setToday() {
    _store.from = moment().startOf('day').toDate();
    _store.to = moment().endOf('day').toDate();
}

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
    },

    from: function() {
        return _store.from;
    },

    to: function() {
        return _store.to;
    }
});

ProjectTimeStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case AppConstants.INIT_FROM_DB:
            _fetchProjectDataFromDb();
            _fetchAllProjectNamesFromDb();
            return true;
        case AppConstants.SET_FROM_DATE:
            _store.from = new Date(action.data);
            _fetchProjectDataFromDb();
            return true;
        case AppConstants.SET_TO_DATE:
            _store.to = new Date(action.data);
            _fetchProjectDataFromDb();
            return true;
        case AppConstants.GOTO_TODAY:
            _setToday();
            _fetchProjectDataFromDb();
            return true;
        default:
            return true;
    }

    ProjectTimeStore.emitChange();

    return true;
});

module.exports = ProjectTimeStore;
