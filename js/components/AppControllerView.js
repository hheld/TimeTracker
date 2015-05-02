/* jshint node: true */

var React                   = require('react'),
    AppStore                = require('../stores/AppStore'),
    ProjectTimeStore        = require('../stores/ProjectTimesStore'),
    AppActions              = require('../actions/AppActions'),
    ScheduleView            = require('./ScheduleView'),
    ExistingProjectSelector = require('./ExistingProjectSelector'),
    TimeRangeSelector       = require('./TimeRangeSelector'),
    ProjectTimeRangeEntry   = require('./ProjectTimeRangeEntry');

function getAppState() {
    return {
        timeBlocks: ProjectTimeStore.timeBlocks(),
        projectNames: ProjectTimeStore.projectNames(),
        from: ProjectTimeStore.from(),
        to: ProjectTimeStore.to()
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

    render: function() {
        return(
            <div>
                <ScheduleView data={this.state.timeBlocks}/>
                <ExistingProjectSelector projectNames={this.state.projectNames} />
                <TimeRangeSelector from={this.state.from}
                                   to={this.state.to}
                                   fromChangeHandler={this._onFromChanged}
                                   toChangeHandler={this._onToChanged} />
                <ProjectTimeRangeEntry onSaveHandler={this._onSaveClicked} />
            </div>
        );
    }
});

module.exports = AppControllerView;
