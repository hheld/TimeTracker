/* jshint node: true */

var React                  = require('react'),
    AppStore               = require('../stores/AppStore'),
    ProjectTimeStore       = require('../stores/ProjectTimesStore'),
    ScheduleView           = require('./ScheduleView'),
    ExistingProjectSelector = require('./ExistingProjectSelector');

function getAppState() {
    return {
        timeBlocks: ProjectTimeStore.timeBlocks(),
        projectNames: ProjectTimeStore.projectNames()
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
            <div>
                <ScheduleView data={this.state.timeBlocks}/>
                <ExistingProjectSelector projectNames={this.state.projectNames} />
            </div>
        );
    }
});

module.exports = AppControllerView;
