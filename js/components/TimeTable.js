/* jshint node: true */

var React = require('react');

var TimeTable = React.createClass({
    render: function() {
        var durations = [];

        var firstColHeading = this.props.times.days.length > 0 ? <th>Project</th> : null;
        var lastColHeading = this.props.times.days.length > 0 ? <th>Total</th> : null;

        var head = this.props.times.days.map(function(day, i) {
            durations.push(this.props.times.durations[day]);
            return (<th key={i}>{day.toDateString()}</th>);
        }.bind(this));

        var rows = this.props.times.projects.map(function(project, i) {
            var total = 0;

            var hours = durations.map(function(duration, j) {
                if(duration.hasOwnProperty(project)) {
                    total += duration[project];
                    return (<td key={j}>{duration[project]}</td>);
                } else {
                   return (<td key={j}>0</td>);
                }
            });

            return (<tr key={i}>
                        <td>{project}</td>{hours}<td>{total}</td>
                    </tr>);
        });

        return (
            <table className="table">
                <thead>
                    <tr>
                        {firstColHeading}{head}{lastColHeading}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
});

module.exports = TimeTable;
