/* jshint node: true */

var React = require('react');

var ExistingProjectSelector = React.createClass({
    _onProjectSelected: function(event) {
        this.props.selectedProject(event.target.value);
    },

    render: function() {
        var options = this.props.projectNames.map(function(projectName, i) {
            return <option key={i}>{projectName}</option>;
        });

        return (
            <div className="form-group">
                <label className={this.props.labelClass}>Existing Project</label>
                <div className={this.props.selectContainerClass}>
                    <select className={this.props.selectClass}
                        onChange={this._onProjectSelected}>
                        {options}
                    </select>
                </div>
            </div>
        );
    }

});

module.exports = ExistingProjectSelector;
