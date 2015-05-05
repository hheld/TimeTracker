/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    EventEmitter  = require('events').EventEmitter,
    merge         = require('object-assign');

var _store = {
    selectedProfile: null
};

var AppStore = merge({}, EventEmitter.prototype, {
    getSelectedProfile: function() {
        return _store.selectedProfile;
    },

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
        case AppConstants.SET_SELECTED_PROJECT:
            _store.selectedProfile = action.data;
            break;
        case AppConstants.UNSELECT_PROJECT:
            _store.selectedProfile = null;
            break;
        default:
            return true;
    }

    AppStore.emitChange();

    return true;
});

module.exports = AppStore;
