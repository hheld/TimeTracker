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
    var width    = 100,
        height   = 50,
        dragbarw = 8,
        w        = props.width;

    var drag = d3.behavior.drag()
        .origin(Object)
        .on("drag", dragmove);

    var svg = d3.select(el).select('svg');

    var newg = svg.append("g");

    var dragRectGroup = newg.selectAll("rect")
    .data([{x: width / 2, y: height / 2},
             {x: 0, y: 50}])
    .enter()
    .append("g");

    dragRectGroup.append("rect")
        .attr("class", "scheduleRect")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("height", height)
        .attr("width", width)
        .attr("fill", "rgb(49, 70, 92)")
        .attr("cursor", "move");

    dragRectGroup.append("rect")
        .attr("class", "leftDragRect")
        .attr("x", function(d) { return d.x - 0.5*dragbarw; })
        .attr("y", function(d) { return d.y; })
        .attr("height", height)
        .attr("width", dragbarw)
        .attr("fill", "rgba(104, 172, 244, 0.69)")
        .attr("cursor", "ew-resize");

    dragRectGroup.call(drag);

    function dragmove(d) {
        d3.select(this).select(".scheduleRect")
            .attr("x", d.x = Math.max(0, Math.min(w - width, d3.event.x)));
        d3.select(this).select(".leftDragRect")
            .attr("x", function(d) { return d.x - 0.5*dragbarw;});
    }
};

module.exports = d3SchedulePlot;
