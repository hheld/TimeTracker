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

function _getTableData() {
    function isWantedEntry(entry) {
        return entry.from.getDate()===d.getDate() &&
            entry.from.getMonth()===d.getMonth() &&
            entry.from.getYear()===d.getYear();
    }

    var dailyDurations = {};
    var allProjectNamesInTimeRange = [];
    var days = [];

    for(var d=new Date(_store.from); d<=_store.to; d.setDate(d.getDate() + 1)) {
        var projectsInDay = _store.timeBlocks.filter(isWantedEntry);

        if(projectsInDay.length>0) {
            dailyDurations[d] = {};
            days.push(new Date(d));

            for(var i=0, len=projectsInDay.length; i<len; ++i) {
                var projectName = projectsInDay[i].project;

                if(allProjectNamesInTimeRange.indexOf(projectName)===-1) {
                    allProjectNamesInTimeRange.push(projectName);
                }

                if(!dailyDurations[d].hasOwnProperty(projectName)) {
                    dailyDurations[d][projectName] = 0;
                }

                dailyDurations[d][projectName] += (projectsInDay[i].to - projectsInDay[i].from) / (1000 * 3600);
            }
        }
    }

    return {
        projects: allProjectNamesInTimeRange.sort(),
        durations: dailyDurations,
        days: days.sort(function(a, b) {return a-b;})
    };
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
    },

    getTableData: _getTableData
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
