// Bill of Health - JavaScript
// Adapted from dataplat.dbatools.io/boh.html

(function() {
  'use strict';

  var activebranch = 'development';

  // Helper function to render health score badge
  function renderHealthBadge(score) {
    var colorClass = 'health-red';
    if (score >= 80) {
      colorClass = 'health-green';
    } else if (score >= 50) {
      colorClass = 'health-yellow';
    } else if (score >= 25) {
      colorClass = 'health-orange';
    }
    return '<span class="health-badge ' + colorClass + '">' + score + '</span>';
  }

  // Helper function to render health score for stats
  function renderAvgHealth(avg) {
    var colorClass = 'health-red';
    if (avg >= 80) {
      colorClass = 'health-green';
    } else if (avg >= 50) {
      colorClass = 'health-yellow';
    } else if (avg >= 25) {
      colorClass = 'health-orange';
    }
    return '<div class="health-badge ' + colorClass + '">' + avg + '%</div>';
  }

  // Initialize DataTable
  var table = $('#health-table').DataTable({
    responsive: true,
    pageLength: 100,
    lengthMenu: [[25, 50, 100, -1], [25, 50, 100, 'All']],
    dom: 'Bfrtip',
    deferRender: true,
    buttons: [
      {
        extend: 'copy',
        exportOptions: {
          orthogonal: null
        }
      },
      {
        extend: 'excel',
        text: 'Excel',
        exportOptions: {
          orthogonal: null
        }
      }
    ],
    ajax: {
      url: 'https://dataplat.dbatools.io/assets/dbatools-boh.json',
      dataSrc: 'data'
    },
    columns: [
      { data: 'Name' },
      { data: 'Health' },
      { data: 'Coverage' },
      { data: 'ScriptAnalyzer' },
      { data: 'Syntax' },
      { data: 'FunctionName' },
      { data: 'EnableException' },
      { data: 'BreakContinue' },
      { data: 'DeprecatedVerbosityCommands' }
    ],
    columnDefs: [
      {
        // Function Name column - link to GitHub
        render: function(data, type, row) {
          if (type !== 'display') {
            return data;
          }
          return '<a class="function-link" target="_blank" href="https://github.com/dataplat/dbatools/blob/' +
            activebranch + '/functions/' + data + '.ps1">' + data + '</a>';
        },
        targets: [0]
      },
      {
        // Health Score column - color badge
        render: function(data, type, row) {
          if (type !== 'display') {
            return data;
          }
          return renderHealthBadge(data);
        },
        targets: [1],
        className: 'text-center'
      },
      {
        // Coverage column - link to CodeCov
        render: function(data, type, row) {
          if (type !== 'display') {
            return data;
          }
          var colorClass = 'health-red';
          if (data >= 80) {
            colorClass = 'health-green';
          } else if (data >= 50) {
            colorClass = 'health-yellow';
          } else if (data >= 25) {
            colorClass = 'health-orange';
          }

          if (data == 0) {
            return '<span class="health-badge ' + colorClass + '">' + data + '%</span>';
          }
          return '<a class="coverage-badge" target="_blank" href="https://codecov.io/gh/dataplat/dbatools/src/' +
            activebranch + '/functions/' + row.Name + '.ps1">' +
            '<span class="health-badge ' + colorClass + '">' + data + '%</span></a>';
        },
        targets: [2],
        className: 'text-center'
      },
      {
        // Boolean columns - thumbs up/down
        render: function(data, type, row) {
          if (type !== 'display') {
            return data;
          }
          if (data == 'True') {
            return '<span class="bool-indicator bool-true">👍</span>';
          } else if (data == 'False') {
            return '<span class="bool-indicator bool-false">👎</span>';
          }
          return data;
        },
        targets: [3, 4, 5, 6, 7, 8],
        className: 'text-center'
      }
    ]
  });

  // Calculate statistics after table init
  table.on('init', function() {
    var total = table.data().count();

    // Calculate tasks for core devs (BreakContinue column - index 7)
    var breakContinueFalse = table
      .columns([7])
      .data()
      .flatten()
      .filter(function(value) {
        return value == 'False';
      });
    $('#tasks-core').text(breakContinueFalse.length);

    // Calculate tasks for everyone (all other boolean columns except BreakContinue)
    var everyoneFalse = table
      .columns([3, 4, 5, 6, 8]) // ScriptAnalyzer, Syntax, FunctionName, EnableException, DeprecatedVerbosity
      .data()
      .flatten()
      .filter(function(value) {
        return value == 'False';
      });
    $('#tasks-everyone').text(everyoneFalse.length);

    // Calculate average health
    var healthScores = table
      .columns([1])
      .data()
      .flatten();
    var averageHealth = _.round(_.mean(healthScores), 2);
    $('#avg-health').html(renderAvgHealth(averageHealth));

    // Trigger hash-based filtering
    $(window).trigger('hashchange');
  });

  // Legend toggle
  $('#toggle-legend').on('click', function() {
    $('#legend-content').toggleClass('hidden');
  });

  // Remove filter button
  $('#remove-filter').on('click', function(e) {
    e.preventDefault();
    table.columns(0).search('.*', true).draw();
    $('#filter-notice').addClass('hidden');
    window.location.hash = '';
  });

  // Hash-based filtering (e.g., #FunctionName)
  $(window).on('hashchange', function(e) {
    var hash = window.location.hash.substr(1);
    if (hash.length > 0) {
      table.columns(0).search(hash).draw();
      $('#filtered-function').text(hash);
      $('#filter-notice').removeClass('hidden');
    } else {
      $('#filter-notice').addClass('hidden');
    }
  });

  // Load and render health trend chart with D3.js
  $.ajax({
    url: 'https://dataplat.dbatools.io/assets/dbatools-boh.json',
    dataType: 'json',
    success: function(data) {
      // Take last 30 data points
      var historyData = _.takeRight(data.history, 30);

      if (historyData.length === 0) {
        $('#health-chart').html('<p class="text-gray-500">No historical data available</p>');
        return;
      }

      // Parse dates
      var parseTime = d3.timeParse('%Y-%m-%d');
      historyData.forEach(function(d) {
        d.date = parseTime(d.date);
      });

      // Set up dimensions
      var margin = {top: 20, right: 30, bottom: 30, left: 50};
      var width = $('#health-chart').width() - margin.left - margin.right;
      var height = 300 - margin.top - margin.bottom;

      // Create SVG
      var svg = d3.select('#health-chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // Set up scales
      var x = d3.scaleTime()
        .domain(d3.extent(historyData, function(d) { return d.date; }))
        .range([0, width]);

      var y = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

      // Create area generator
      var area = d3.area()
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.value); });

      // Create line generator
      var line = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.value); });

      // Add area
      svg.append('path')
        .datum(historyData)
        .attr('class', 'chart-area')
        .attr('d', area);

      // Add line
      svg.append('path')
        .datum(historyData)
        .attr('class', 'chart-line')
        .attr('d', line);

      // Add baseline at 85%
      svg.append('line')
        .attr('class', 'chart-baseline')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y(85))
        .attr('y2', y(85));

      // Add baseline label
      svg.append('text')
        .attr('x', width - 5)
        .attr('y', y(85) - 5)
        .attr('text-anchor', 'end')
        .attr('class', 'text-sm')
        .style('fill', 'var(--color-attention)')
        .text('1.0 Ready (85%)');

      // Add X axis
      svg.append('g')
        .attr('class', 'chart-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x).ticks(5).tickFormat(d3.timeFormat('%Y-%m-%d')));

      // Add Y axis
      svg.append('g')
        .attr('class', 'chart-axis')
        .call(d3.axisLeft(y).ticks(5).tickFormat(function(d) { return d + '%'; }));

      // Add tooltip
      var tooltip = d3.select('body')
        .append('div')
        .attr('class', 'chart-tooltip');

      // Add interactive circles
      svg.selectAll('.dot')
        .data(historyData)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', function(d) { return x(d.date); })
        .attr('cy', function(d) { return y(d.value); })
        .attr('r', 4)
        .style('fill', 'var(--color-primary)')
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
          tooltip
            .style('opacity', 1)
            .html(d3.timeFormat('%Y-%m-%d')(d.date) + '<br/>Health: ' + d.value.toFixed(2) + '%')
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
          tooltip.style('opacity', 0);
        });
    },
    error: function(xhr, status, error) {
      console.error('Error loading health data:', error);
      $('#health-chart').html('<p class="text-red-500">Error loading chart data</p>');
    }
  });

})();
