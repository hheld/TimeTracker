/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants = require('../constants/AppConstants');

var AppActions = {
    initFromDb: function() {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.INIT_FROM_DB,
        });
    },

    setFromDate: function(fromDate) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SET_FROM_DATE,
            data: fromDate
        });
    },

    setToDate: function(toDate) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SET_TO_DATE,
            data: toDate
        });
    },
};

module.exports = AppActions;
