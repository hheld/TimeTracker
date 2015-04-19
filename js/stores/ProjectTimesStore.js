/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    EventEmitter  = require('events').EventEmitter,
    merge         = require('object-assign');

var _store = [
    {
        project: 'P 1',
        from: new Date(2015, 03, 14, 8, 0),
        to: new Date(2015, 03, 14, 10, 30)
    },
    {
        project: 'P 2',
        from: new Date(2015, 03, 14, 10, 30),
        to: new Date(2015, 03, 14, 11, 30)
    }, {
        project: 'P 1',
        from: new Date(2015, 03, 14, 12, 30),
        to: new Date(2015, 03, 14, 17, 0),
    }
];

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

    allTimes: function() {
        return _store;
    }
});

ProjectTimeStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        default:
            return true;
    }

    ProjectTimeStore.emitChange();

    return true;
});

module.exports = ProjectTimeStore;
