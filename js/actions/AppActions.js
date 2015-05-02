/* jshint node: true */

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    AppConstants  = require('../constants/AppConstants'),
    pdb           = require('../utils/projectsDb');

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

    saveProjectData: function(project) {
        pdb.upsert(project)
            .then(function(){
            AppActions.initFromDb();
        });
    },

    setSelectedProject: function(project) {
        AppDispatcher.handleViewAction({
            actionType: AppConstants.SET_SELECTED_PROJECT,
            data: project
        });
    }
};

module.exports = AppActions;
