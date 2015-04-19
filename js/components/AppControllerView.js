/* jshint node: true */

var React            = require('react'),
    AppStore         = require('../stores/AppStore'),
    ProjectTimeStore = require('../stores/ProjectTimesStore'),
    ScheduleView     = require('./ScheduleView');

function getAppState() {
    return {
        projectTimes: ProjectTimeStore.allTimes()
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

    render: function() {
        return(
            <ScheduleView data={this.state.projectTimes}/>
        );
    }
});

module.exports = AppControllerView;
