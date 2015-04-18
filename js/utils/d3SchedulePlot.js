/* jshint node: true */

var d3 = require('d3');

var d3SchedulePlot = {};

d3SchedulePlot.create = function(el, props, data) {
    var width  = props.width,
        height = props.height,
        margin = props.margin;

    width -=  margin.left + margin.right;
    height -=  margin.top + margin.bottom;

    var svg = d3.select(el)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

    this.update(el, props, data);
};

d3SchedulePlot.update = function(el, props, data) {
    this._drawSchedules(el, props, data);
};

d3SchedulePlot.destroy = function(el) {
    d3.select(el).selectAll('*').remove();
};

d3SchedulePlot._drawSchedules = function(el, props, data) {
    var w      = props.width,
        h      = props.height,
        height = (h - props.margin.bottom) / data.length;

    var x = d3.time.scale().range([props.margin.left, w-props.margin.right]);

    var minTime = d3.min(data, function(d) { return d.from; }),
        maxTime = d3.max(data, function(d) { return d.to; });

    x.domain([minTime, maxTime]);

    var customTimeFormat = d3.time.format("%H:%M");
    var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .tickFormat(customTimeFormat);

    var svg = d3.select(el).select('svg');
    var newg = svg.append("g");

    var scheduleRectGroup = newg.selectAll("rect")
    .data(data)
    .enter()
    .append("g");

    scheduleRectGroup.append("rect")
        .attr("class", "scheduleRect")
        .attr("x", function(d) { return x(d.from); })
        .attr("y", function(d, i) { return i * height; })
        .attr("height", height)
        .attr("width", function(d) { return x(d.to) - x(d.from); })
        .attr("fill", "rgb(49, 70, 92)");

    newg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (props.height-props.margin.bottom) + ")")
        .call(xAxis);
};

module.exports = d3SchedulePlot;
