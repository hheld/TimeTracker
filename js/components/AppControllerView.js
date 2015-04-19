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
        var data = [
            {
                project: 'P 1',
                from: new Date(2015, 03, 14, 8, 0),
                to: new Date(2015, 03, 14, 10, 30)
            },
            {
                project: 'P 2',
                from: new Date(2015, 03, 14, 10, 30),
                to: new Date(2015, 03, 14, 11, 30)
            }, {
                project: 'P 1',
                from: new Date(2015, 03, 14, 12, 30),
                to: new Date(2015, 03, 14, 17, 0),
            }
        ];

        return(
            <ScheduleView data={data}/>
        );
    }
});

module.exports = AppControllerView;
