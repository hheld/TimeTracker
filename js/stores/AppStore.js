/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    EventEmitter  = require('events').EventEmitter,
    merge         = require('object-assign');

var AppStore = merge({}, EventEmitter.prototype, {
    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppStore.dispatcherToken = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        default:
            return true;
    }

    AppStore.emitChange();

    return true;
});

module.exports = AppStore;

