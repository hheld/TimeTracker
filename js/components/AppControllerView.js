/* jshint node: true */

var React                   = require('react'),
    AppStore                = require('../stores/AppStore'),
    ProjectTimeStore        = require('../stores/ProjectTimesStore'),
    AppActions              = require('../actions/AppActions'),
    ScheduleView            = require('./ScheduleView'),
    TimeRangeSelector       = require('./TimeRangeSelector'),
    ProjectTimeRangeEntry   = require('./ProjectTimeRangeEntry');

function getAppState() {
    return {
        timeBlocks: ProjectTimeStore.timeBlocks(),
        projectNames: ProjectTimeStore.projectNames(),
        from: ProjectTimeStore.from(),
        to: ProjectTimeStore.to(),
        selectedProfile: AppStore.getSelectedProfile()
    };
}

var AppControllerView = React.createClass({
    getInitialState: function() {
        return getAppState();
    },

    componentDidMount: function() {
        // add change listeners for relevant stores
        AppStore.addChangeListener(this._onChange);
        ProjectTimeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        // remove change listeners for relevant stores
        AppStore.removeChangeListener(this._onChange);
        ProjectTimeStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getAppState());
    },

    _onFromChanged: function(fromDate) {
        AppActions.setFromDate(fromDate);
    },

    _onToChanged: function(toDate) {
        AppActions.setToDate(toDate);
    },

    _onSaveClicked: function(project) {
        AppActions.saveProjectData(project);
    },

    _onProjectSelected: function(project) {
        AppActions.setSelectedProject(project);
    },

    _onDeleteClicked: function(id) {
        AppActions.deleteEntry(id);
    },

    _onGoToTodayClicked: function() {
        AppActions.goToToday();
    },

    render: function() {
        return(
            <div>
                <TimeRangeSelector from={this.state.from}
                                   to={this.state.to}
                                   fromChangeHandler={this._onFromChanged}
                                   toChangeHandler={this._onToChanged}
                                   goToTodayClicked={this._onGoToTodayClicked} />
                <ScheduleView data={this.state.timeBlocks}
                              selectedProjectHandler={this._onProjectSelected} />
                <ProjectTimeRangeEntry onSaveHandler={this._onSaveClicked}
                                       projectNames={this.state.projectNames}
                                       selectedProfile={this.state.selectedProfile}
                                       onDeleteHandler={this._onDeleteClicked} />
            </div>
        );
    }
});

module.exports = AppControllerView;
