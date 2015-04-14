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
            data: [
                { from: '0', to: '100' },
                { from: '300', to: '600'}
            ]
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

        d3SchedulePlot.create(el, props, this.props.data);
    },

    componentDidUpdate: function(prevProps, prevState) {
        var el = this.refs.chart.getDOMNode(),
            props = this._getProps();

        d3SchedulePlot.update(el, props,this.props.data);
    },

    componentWillUnmount: function() {
        var el = this.refs.chart.getDOMNode();
        d3SchedulePlot.destroy(el);
    },

    render: function() {
        return(
            <div ref='chart' />
        );
    }
});

module.exports = ScheduleView;
