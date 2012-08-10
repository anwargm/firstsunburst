<div dir="ltr" style="text-align: left;" trbidi="on">
    <style type="text/css">

path {
  stroke: #fff;
  fill-rule: evenodd;
}

    </style>
  </head>
  <body>
    <div id="chart"></div>
    <script type="text/javascript">

var width = 960,
    height = 700,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.sqrt()
    .range([0, radius]);

var color = d3.scale.category20c();

var vis = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });
var myJSONtext = { "name": "flare", "children": [  {   "name": "analytics",   "children": [    {     "name": "cluster",     "children": [      {"name": "AgglomerativeCluster", "size": 3938},      {"name": "CommunityStructure", "size": 3812},      {"name": "HierarchicalCluster", "size": 6714},      {"name": "MergeEdge", "size": 743}     ]    },    {     "name": "graph",     "children": [      {"name": "BetweennessCentrality", "size": 3534},      {"name": "LinkDistance", "size": 5731},      {"name": "MaxFlowMinCut", "size": 7840},      {"name": "ShortestPaths", "size": 5914},      {"name": "SpanningTree", "size": 3416}     ]    },    {     "name": "optimization",     "children": [      {"name": "AspectRatioBanker", "size": 7074}     ]    }   ]  },  {   "name": "animate",   "children": [    {"name": "Easing", "size": 17010},    {"name": "FunctionSequence", "size": 5842},    {     "name": "interpolate",     "children": [      {"name": "ArrayInterpolator", "size": 1983},      {"name": "ColorInterpolator", "size": 2047},      {"name": "DateInterpolator", "size": 1375},      {"name": "Interpolator", "size": 8746},      {"name": "MatrixInterpolator", "size": 2202},      {"name": "NumberInterpolator", "size": 1382},      {"name": "ObjectInterpolator", "size": 1629},      {"name": "PointInterpolator", "size": 1675},      {"name": "RectangleInterpolator", "size": 2042}     ]    },    {"name": "ISchedulable", "size": 1041},    {"name": "Parallel", "size": 5176},    {"name": "Pause", "size": 449},    {"name": "Scheduler", "size": 5593},    {"name": "Sequence", "size": 5534},    {"name": "Transition", "size": 9201},    {"name": "Transitioner", "size": 19975},    {"name": "TransitionEvent", "size": 1116},    {"name": "Tween", "size": 6006}   ]  },  {   "name": "data",   "children": [    {     "name": "converters",     "children": [      {"name": "Converters", "size": 721},      {"name": "DelimitedTextConverter", "size": 4294},      {"name": "GraphMLConverter", "size": 9800},      {"name": "IDataConverter", "size": 1314},      {"name": "JSONConverter", "size": 2220}     ]    },    {"name": "DataField", "size": 1759},    {"name": "DataSchema", "size": 2165},    {"name": "DataSet", "size": 586},    {"name": "DataSource", "size": 3331},    {"name": "DataTable", "size": 772},    {"name": "DataUtil", "size": 3322}   ]  },  {   "name": "display",   "children": [    {"name": "DirtySprite", "size": 8833},    {"name": "LineSprite", "size": 1732},    {"name": "RectSprite", "size": 3623},    {"name": "TextSprite", "size": 10066}   ]  },  {   "name": "flex",   "children": [    {"name": "FlareVis", "size": 4116}   ]  } ]};

var jsononj = eval('(' + myJSONtext + ')');

  var path = vis.data([jsononj]).selectAll("path")
      .data(partition.nodes)
    .enter().append("path")
      .attr("d", arc)
      .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
      .on("click", click);

  function click(d) {
    path.transition()
      .duration(750)
      .attrTween("d", arcTween(d));
  }


// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

    </script>

</div>