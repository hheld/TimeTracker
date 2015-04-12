/* jshint node: true */

var React        = require('react'),
    AppStore     = require('../stores/AppStore'),
    ScheduleView = require('./ScheduleView');

function getAppState() {
    return {
    };
}

var AppControllerView = React.createClass({
    getInitialState: function() {
        return getAppState();
    },

    componentDidMount: function() {
        // add change listeners for relevant stores
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        // remove change listeners for relevant stores
        AppStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getAppState());
    },

    render: function() {
        return(
            <ScheduleView />
        );
    }
});

module.exports = AppControllerView;
