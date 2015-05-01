/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var AppActions = {
    initFromDb: function() {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.INIT_FROM_DB,
        });
    }
};

module.exports = AppActions;
