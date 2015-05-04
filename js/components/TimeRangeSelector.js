/* jshint node: true */

var React = require('react');

var TimeRangeSelector = React.createClass({
    statics: {
        getDate: function(dateTimeObj) {
            var timeZoneOffset = dateTimeObj.getTimezoneOffset() * 60 * 1000,
                localDate = new Date(dateTimeObj.getTime() - timeZoneOffset);

            return localDate.toISOString().replace('Z', '').substring(0, 10);
        }
    },

    _onFromChanged: function(event) {
        this.props.fromChangeHandler(event.target.value);
    },

    _onToChanged: function(event) {
        this.props.toChangeHandler(event.target.value);
    },

    _onTodayBtnClicked: function() {
        this.props.goToTodayClicked();
    },

    render: function() {
        return (
            <form className="form-inline">
                <div className="form-group">
                    <label>View from</label>
                    <input type="date" className="form-control"
                           defaultValue={TimeRangeSelector.getDate(this.props.from)}
                           value={TimeRangeSelector.getDate(this.props.from)}
                           onChange={this._onFromChanged} />
                </div>
                <div className="form-group">
                    <label>View to</label>
                    <input type="date" className="form-control"
                           defaultValue={TimeRangeSelector.getDate(this.props.to)}
                           value={TimeRangeSelector.getDate(this.props.to)}
                           onChange={this._onToChanged} />
                </div>
                <button type="button"
                        className="btn btn-default"
                        onClick={this._onTodayBtnClicked}>Today</button>
            </form>
        );
    }

});

module.exports = TimeRangeSelector;
