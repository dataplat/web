// SQL Server Build Reference - JavaScript
// Adapted from dataplat.dbatools.io/builds.html

(function() {
  'use strict';

  // Initialize DataTable
  var table = $('#builds-table').DataTable({
    responsive: true,
    pageLength: 100,
    order: [[0, 'desc']], // Sort by ID descending (newest first)
    dom: '<"datatable-top"B>rt<"datatable-bottom"<"datatable-info"i><"datatable-pagination"p>>', // Custom layout with separate wrappers
    buttons: [
      {
        extend: 'copy',
        exportOptions: {
          orthogonal: 'export'
        }
      },
      {
        extend: 'excel',
        exportOptions: {
          orthogonal: 'export'
        }
      },
      {
        extend: 'pdf',
        exportOptions: {
          orthogonal: 'export'
        }
      }
    ],
    fixedHeader: true, // Enable sticky header
    columnDefs: [
      {
        targets: 0, // ID column
        visible: false,
        searchable: false
      },
      {
        targets: [7, 8, 9, 10], // SP?, CU?, Latest SP?, Latest CU?
        className: 'text-center',
        render: function(data, type, row, meta) {
          // For filtering, sorting, and exports, return plain text
          if (type === 'export') {
            return data == 'X' ? 'Yes' : '';
          }
          if (type === 'filter') {
            return data == 'X' ? 'X' : '.';
          }
          // For display, return the checkmark
          return data == 'X' ? '&#10003;' : '';
        }
      },
      {
        targets: [3, 4, 5, 6], // SP, CU, Release Date, Support columns
        render: function(data, type, row, meta) {
          return data == '.' ? '' : data;
        }
      }
    ]
  });

  // Version filter buttons
  $('.version-filter').on('click', function() {
    var filterValue = $(this).data('filter');
    var searchTerm = '';

    if (filterValue !== 'all') {
      searchTerm = '^' + filterValue + '$';
    }

    table.columns(2) // Name column
      .search(searchTerm, true, false)
      .draw();

    $('.version-filter').removeClass('active');
    $(this).addClass('active');
  });

  // Reset attribute filters
  function resetAttributeFilters() {
    table.columns(7).search('')
      .columns(8).search('')
      .columns(9).search('')
      .columns(10).search('')
      .draw();
  }

  // Attribute filter buttons
  $('.attribute-filter').on('click', function() {
    var filterType = $(this).data('filter');

    // Toggle active state
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      resetAttributeFilters();
      return;
    }

    $('.attribute-filter').removeClass('active');
    $(this).addClass('active');

    resetAttributeFilters();

    // Apply specific filter
    switch(filterType) {
      case 'service-packs':
        table.columns(7).search('X').draw();
        break;
      case 'cumulative-updates':
        table.columns(8).search('X').draw();
        break;
      case 'latest-sp':
        table.columns(9).search('X').draw();
        break;
      case 'latest-cu':
        table.columns(10).search('X').draw();
        break;
    }
  });

  // Load and process data
  $.ajax({
    dataType: 'json',
    url: 'https://dataplat.dbatools.io/assets/dbatools-buildref-index.json',
    success: function(data) {
      // Update last updated date
      if (data.LastUpdated) {
        $('#last-updated').text(data.LastUpdated.substring(0, 10));
      }

      // Process data
      var results = [];
      var prevName = '.';
      var prevSP = '.';
      var prevCU = '.';
      var prevSupportedUntil = '.';
      var prevrow = null;

      _.forEach(data.Data, function(el, i) {
        var is_SP = '.';
        var is_CU = '.';
        var is_LatestCU = '.';

        // Track version changes
        if (el.Name && el.Name.length > 3) {
          if (el.Name != prevName) {
            prevName = el.Name;
            prevSP = '.';
            prevCU = '.';
            is_LatestCU = 'X';
            prevSupportedUntil = '.';
          }
        }

        // Mark Service Packs
        if (el.SP && el.SP !== 'RC') {
          is_SP = 'X';
          var compareSP = el.SP;
          if (compareSP != prevSP) {
            prevSP = compareSP;
            prevCU = '.';
            is_LatestCU = 'X';
            prevSupportedUntil = '.';
          }
        }

        // Mark Cumulative Updates
        if (el.CU && el.CU.length > 2) {
          is_CU = 'X';
          if (el.CU != prevCU) {
            prevCU = el.CU;
          }
        }

        // Track support dates
        if (el.SupportedUntil && el.SupportedUntil.length > 2) {
          if (el.SupportedUntil != prevSupportedUntil) {
            prevSupportedUntil = el.SupportedUntil.substring(0, 10);
          }
        }

        // Format KB List with links
        var nKBList = '';
        if (el.KBList) {
          if (_.isArray(el.KBList)) {
            var KBArr = [];
            for (var kbl = 0; kbl < el.KBList.length; kbl++) {
              KBArr.push('<a class="kb-link" target="_blank" href="https://duckduckgo.com/?q=kb' +
                el.KBList[kbl] + '">KB' + el.KBList[kbl] + '</a>');
            }
            nKBList = KBArr.join(' ');
          } else {
            nKBList = '<a class="kb-link" target="_blank" href="https://duckduckgo.com/?q=kb' +
              el.KBList + '">KB' + el.KBList + '</a>';
          }
        }

        // Handle LATEST SP tag
        if (_.isArray(prevSP) && prevSP.indexOf('LATEST') !== -1) {
          prevSP = prevSP.filter(el => el != 'LATEST');
        }

        // Mark previous row as latest CU if appropriate
        if (is_LatestCU !== '.') {
          if (results.length > prevrow && prevrow !== null) {
            if (results[prevrow][8] !== '.') {
              results[prevrow][10] = 'X';
            }
          }
        }

        prevrow = i;

        // Format version with retired badge
        var niceVersion = el.Version;
        if (el.Retired) {
          niceVersion += ' <span class="retired-badge">Retired</span>';
        }

        // Add row to results
        results.push([
          i,                    // 0: ID (hidden)
          niceVersion,          // 1: Version
          prevName,             // 2: Name
          prevSP,               // 3: SP
          prevCU,               // 4: CU
          typeof el.ReleaseDate === 'string' &&
            /^\d{4}-\d{2}-\d{2}(?:T|$)/.test(el.ReleaseDate) &&
            !Number.isNaN(Date.parse(el.ReleaseDate.substring(0, 10))) &&
            new Date(el.ReleaseDate.substring(0, 10)).toISOString().substring(0, 10) ===
              el.ReleaseDate.substring(0, 10)
            ? el.ReleaseDate.substring(0, 10)
            : '.',              // 5: Release Date
          prevSupportedUntil,   // 6: Support Until
          is_SP,                // 7: SP?
          is_CU,                // 8: CU?
          '.',                  // 9: Latest SP? (filled below)
          '.',                  // 10: Latest CU? (filled below)
          nKBList               // 11: KB List
        ]);
      });

      // Mark latest SP per version
      var datareverse = _.reverse(results.slice());
      var spdata = _.filter(datareverse, function(o) { return o[7] === 'X'; });
      var lastrel = '';
      _.forEach(spdata, function(el, i) {
        if (el[2] != lastrel && el[1].indexOf('Retired') === -1) {
          results[el[0]][9] = 'X';
          lastrel = el[2];
        }
      });

      // Mark latest CU per version/SP combination
      var cudata = _.filter(datareverse, function(o) { return o[8] === 'X'; });
      lastrel = '';
      _.forEach(cudata, function(el, i) {
        if (el[2] + el[3] != lastrel && el[1].indexOf('Retired') === -1) {
          results[el[0]][10] = 'X';
          lastrel = el[2] + el[3];
        }
      });

      // Add data to table
      table.rows.add(results);
      table.draw(false);
    },
    error: function(xhr, status, error) {
      console.error('Error loading build reference data:', error);
      $('#last-updated').text('Error loading data');
    }
  });

  // Wire up custom search input
  $('#custom-search').on('keyup', function() {
    table.search(this.value).draw();
  });

  // Wire up custom export buttons
  $('#export-copy').on('click', function() {
    table.button('.buttons-copy').trigger();
  });

  $('#export-excel').on('click', function() {
    table.button('.buttons-excel').trigger();
  });

  $('#export-pdf').on('click', function() {
    table.button('.buttons-pdf').trigger();
  });

})();
