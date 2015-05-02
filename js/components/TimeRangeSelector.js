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

    render: function() {
        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 control-label">From</label>
                    <div className="col-sm-3">
                        <input type="date" className="form-control"
                               defaultValue={TimeRangeSelector.getDate(this.props.from)}
                               value={TimeRangeSelector.getDate(this.props.from)}
                               onChange={this._onFromChanged} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 control-label">To</label>
                    <div className="col-sm-3">
                        <input type="date" className="form-control"
                               defaultValue={TimeRangeSelector.getDate(this.props.to)}
                               value={TimeRangeSelector.getDate(this.props.to)}
                               onChange={this._onToChanged} />
                    </div>
                </div>
            </form>
        );
    }

});

module.exports = TimeRangeSelector;
