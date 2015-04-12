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

    var dragright = d3.behavior.drag()
    .origin(Object)
    .on("drag", rdragresize);

    var dragleft = d3.behavior.drag()
    .origin(Object)
    .on("drag", ldragresize);

    var svg = d3.select(el).select('svg');

    var newg = svg.append("g")
      .data([{x: width / 2, y: height / 2}]);

    var dragrect = newg.append("rect")
    .attr("id", "active")
    .attr("x", function(d) { return d.x; })
    .attr("y", function(d) { return d.y; })
    .attr("height", height)
    .attr("width", width)
    .attr("fill", "rgb(49, 70, 92)")
    .attr("cursor", "move")
    .call(drag);

    var dragbarleft = newg.append("rect")
    .attr("x", function(d) { return d.x - (dragbarw/2); })
    .attr("y", function(d) { return d.y + (dragbarw/2); })
    .attr("height", height - dragbarw)
    .attr("id", "dragleft")
    .attr("width", dragbarw)
    .attr("fill", "lightblue")
    .attr("fill-opacity", 0.5)
    .attr("cursor", "ew-resize")
    .call(dragleft);

    var dragbarright = newg.append("rect")
    .attr("x", function(d) { return d.x + width - (dragbarw/2); })
    .attr("y", function(d) { return d.y + (dragbarw/2); })
    .attr("id", "dragright")
    .attr("height", height - dragbarw)
    .attr("width", dragbarw)
    .attr("fill", "lightblue")
    .attr("fill-opacity", 0.5)
    .attr("cursor", "ew-resize")
    .call(dragright);

    function dragmove(d) {
        dragrect
            .attr("x", d.x = Math.max(0, Math.min(w - width, d3.event.x)));
        dragbarleft
            .attr("x", function(d) { return d.x - (dragbarw/2); });
        dragbarright
            .attr("x", function(d) { return d.x + width - (dragbarw/2); });
    }

    function ldragresize(d) {
        var oldx = d.x;
        //Max x on the right is x + width - dragbarw
        //Max x on the left is 0 - (dragbarw/2)
        d.x = Math.max(0, Math.min(d.x + width - (dragbarw / 2), d3.event.x));
        width = width + (oldx - d.x);

        dragbarleft
            .attr("x", function(d) { return d.x - (dragbarw / 2); });
        dragrect
            .attr("x", function(d) { return d.x; })
            .attr("width", width);
    }

    function rdragresize(d) {
        //Max x on the left is x - width
        //Max x on the right is width of screen + (dragbarw/2)
        var dragx = Math.max(d.x + (dragbarw/2), Math.min(w, d.x + width + d3.event.dx));

        //recalculate width
        width = dragx - d.x;

        //move the right drag handle
        dragbarright
            .attr("x", function(d) { return dragx - (dragbarw/2); });

        //resize the drag rectangle
        //as we are only resizing from the right, the x coordinate does not need to change
        dragrect
            .attr("width", width);
    }
};

module.exports = d3SchedulePlot;
