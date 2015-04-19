/* jshint node: true */

var React = require('react');

var ExistingProjectSelector = React.createClass({

    render: function() {
        var options = this.props.projectNames.map(function(projectName, i) {
            return <option key={i}>{projectName}</option>;
        });

        return (
            <div className="form-group">
                <label>Project</label>
                <select className="form-control">
                    {options}
                </select>
            </div>
        );
    }

});

module.exports = ExistingProjectSelector;
