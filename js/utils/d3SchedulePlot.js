/* jshint node: true */

var d3 = require('d3'),
    EventEmitter = require('events').EventEmitter;

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

    svg.append("g")
        .attr("class", "x axis");

    svg.append("g")
        .attr("class", "y axis");

    var dispatcher = new EventEmitter();

    this.update(el, props, data, dispatcher);

    return dispatcher;
};

d3SchedulePlot.update = function(el, props, data, dispatcher) {
    var scales = this._scales(el, props, data);
    this._drawSchedules(el, props, data, dispatcher, scales);
};

d3SchedulePlot.destroy = function(el) {
    d3.select(el).selectAll('*').remove();
};

d3SchedulePlot._scales = function(el, props, data) {
    var xa = d3.select(el).select(".x.axis");

    var x = d3.time.scale().range([props.margin.left, props.width-props.margin.right]);

    var minTime = d3.min(data, function(d) { return d.from; }),
        maxTime = d3.max(data, function(d) { return d.to; });

    x.domain([minTime, maxTime]);

    var customTimeFormat = d3.time.format("%H:%M");
    var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom")
                    .tickFormat(customTimeFormat);

    xa.transition()
        .attr("transform", "translate(0," + (props.height-props.margin.bottom) + ")")
        .call(xAxis);

    if(data.length===0) {
        xa.attr("opacity", 0);
    } else {
        xa.attr("opacity", 1);
    }

    var ya = d3.select(el).select(".y.axis");
    var nestedData = d3.nest()
                        .key(function(d) { return d.project; })
                        .sortKeys(d3.ascending)
                        .entries(data);

    var y = d3.scale.ordinal()
                .rangePoints([0, props.height - props.margin.bottom - props.margin.top], 1)
                .domain(nestedData.map(function(d) { return d.key; }));

    var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

    ya.transition()
        .attr("transform", "translate(" + props.margin.left + "," + props.margin.top + ")")
        .call(yAxis);

    return {
        x: x,
        y: y
    };
};

d3SchedulePlot._drawSchedules = function(el, props, data, dispatcher, scales) {
    var nestedData = d3.nest()
                        .key(function(d) { return d.project; })
                        .sortKeys(d3.ascending)
                        .entries(data);

    var w      = props.width,
        h      = props.height,
        height = (h - props.margin.bottom - props.margin.top) / nestedData.length;

    var svg = d3.select(el).select('svg');
    var rowGroup = svg.selectAll(".projectRow")
                        .data(nestedData);

    rowGroup.enter()
        .append("g")
        .attr("transform", "translate(0," + props.margin.top + ")")
        .attr("class", "projectRow");

    var scheduleRectGroup = rowGroup.selectAll(".scheduleRect")
                                .data(function(d, i) { return d.values.map(function(v) { v.row = i; return v; }); });

    scheduleRectGroup.enter()
        .append("rect")
        .attr("class", "scheduleRect")
        .on('click', function(d) {
            dispatcher.emit('click:project', d);
        });

    scheduleRectGroup
        .transition()
        .attr("x", function(d) { return scales.x(d.from); })
        .attr("y", function(d) { return d.row * height; })
        .attr("height", height)
        .attr("width", function(d) { return scales.x(d.to) - scales.x(d.from); })
        .attr("fill", "rgb(49, 70, 92)");

    rowGroup.exit()
        .remove();

    scheduleRectGroup.exit()
        .remove();
};

module.exports = d3SchedulePlot;
