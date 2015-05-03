/* jshint node: true */

var React                   = require('react'),
    moment                  = require('moment'),
    ExistingProjectSelector = require('./ExistingProjectSelector');

var ProjectTimeRangeEntry = React.createClass({
    statics: {
        getTime: function(dateTimeObj) {
            var timeZoneOffset = dateTimeObj.getTimezoneOffset() * 60 * 1000,
                localDate = new Date(dateTimeObj.getTime() - timeZoneOffset);

            return localDate.toISOString().replace('Z', '');
        }
    },

    getInitialState: function() {
        return {
            projectName: null,
            from: moment().startOf('hour').toDate(),
            to: moment().startOf('hour').add(1, 'hour').toDate(),
            update: false
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if(nextProps.selectedProfile) {
            this.setState({
                projectName: nextProps.selectedProfile.project,
                from: nextProps.selectedProfile.from,
                to: nextProps.selectedProfile.to,
                update: !!nextProps.selectedProfile._id
            });
        } else {
            this.setState({
                update: false
            });
        }
    },

    _onProjectNameChanged: function(event) {
        this.setState({
            projectName: event.target.value,
        });
    },

    _onSaveClicked: function() {
        var newProjectData = {
            project: this.state.projectName,
            from: new Date(this.state.from),
            to: new Date(this.state.to),
            _id: this.props.selectedProfile && this.state.update ? this.props.selectedProfile._id : null
        };

        this.props.onSaveHandler(newProjectData);
    },

    _onFromChanged: function(event) {
        var newFromDate = new Date(event.target.value);

        newFromDate.setTime(newFromDate.getTime() + newFromDate.getTimezoneOffset() * 60 * 1000);

        this.setState({
            from: newFromDate
        });
    },

    _onToChanged: function(event) {
        var newToDate = new Date(event.target.value);

        newToDate.setTime(newToDate.getTime() + newToDate.getTimezoneOffset() * 60 * 1000);

        this.setState({
            to: newToDate
        });
    },

    _onExistingProjectSelected: function(projectName) {
        this.setState({
            projectName: projectName
        });
    },

    render: function() {
        var storeButtonClass = this.state.update ? 'btn btn-info' : 'btn btn-primary';
        var buttonText = this.state.update ? 'Update' : 'Save';

        var storeButton = this.state.projectName ? <div className="form-group">
                              <div className="col-sm-offset-2 col-sm-10">
                                  <button type="button" className={storeButtonClass} onClick={this._onSaveClicked}>{buttonText}</button>
                              </div>
                          </div> : null;

        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">Project name</label>
                    <div className="col-sm-3">
                        <input type="text" className="form-control"
                               value={this.state.projectName}
                               onChange={this._onProjectNameChanged} />
                    </div>
                </div>
                <ExistingProjectSelector
                    labelClass="col-sm-2 control-label"
                    selectClass="form-control"
                    selectContainerClass="col-sm-3"
                    projectNames={this.props.projectNames}
                    selectedProject={this._onExistingProjectSelected} />
                <div className="form-group">
                    <label className="col-sm-2 control-label">From</label>
                    <div className="col-sm-3">
                        <input type="datetime-local" className="form-control"
                               value={ProjectTimeRangeEntry.getTime(this.state.from)}
                               onChange={this._onFromChanged} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">To</label>
                    <div className="col-sm-3">
                        <input type="datetime-local" className="form-control"
                               value={ProjectTimeRangeEntry.getTime(this.state.to)}
                               onChange={this._onToChanged} />
                    </div>
                </div>
                {storeButton}
            </form>
        );
    }

});

module.exports = ProjectTimeRangeEntry;
