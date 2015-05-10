/* jshint node: true */

var React = require('react'),
    d3SchedulePlot = require('../utils/d3SchedulePlot');

var ScheduleView = React.createClass({
    getDefaultProps: function() {
        return {
            width: 800,
            height: 300,
            margin: {
                top: 20,
                right: 80,
                bottom: 30,
                left: 50
            },
            data: []
        };
    },

    _getProps: function() {
        return {
            width: this.props.width,
            height: this.props.height,
            margin: this.props.margin
        };
    },

    componentDidMount: function() {
        var el = this.refs.chart.getDOMNode(),
            props = this._getProps();

        var dispatcher = d3SchedulePlot.create(el, props, this.props.data);

        dispatcher.on('click:project', this.onProjectClicked);
        dispatcher.on('click:outside', this.onProjectClicked);

        this.dispatcher = dispatcher;
        this.counter = 3;
    },

    componentDidUpdate: function(prevProps, prevState) {
        var el = this.refs.chart.getDOMNode(),
            props = this._getProps();

        d3SchedulePlot.update(el, props, this.props.data, this.dispatcher);
    },

    componentWillUnmount: function() {
        var el = this.refs.chart.getDOMNode();
        d3SchedulePlot.destroy(el);
    },

    render: function() {
        return(
            <div ref='chart' className="scheduleView" />
        );
    },

    onProjectClicked: function(d) {
        this.props.selectedProjectHandler(d);
    }
});

module.exports = ScheduleView;
