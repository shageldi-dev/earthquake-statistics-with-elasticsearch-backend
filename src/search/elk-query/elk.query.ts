export const dashboardQuery = (
  startDate: string,
  endDate: string,
  search: string,
) => {
  let filter: any = {
    match_all: {},
  };
  let searchFilter: any = {};
  if (search && search.trim().length > 0) {
    searchFilter = {
      must: [
        {
          match: {
            place: search,
          },
        },
      ],
    };

    filter = {
      bool: searchFilter,
    };
  }
  if (startDate && endDate) {
    filter = {
      bool: {
        ...searchFilter,
        filter: [
          {
            range: {
              '@timestamp': {
                gte: startDate,
                lte: endDate,
                format: 'yyyy/MM/dd',
              },
            },
          },
        ],
      },
    };
  }

  return {
    track_total_hits: true,
    fields: ['*'],
    query: filter,
    aggs: {
      totalDocs: {
        value_count: {
          field: '_index',
        },
      },
      totalTypes: {
        cardinality: {
          field: 'type',
        },
      },
      location_by_frequency: {
        terms: {
          field: 'place.keyword',
          size: 10,
        },
      },
      max_of_magnitude: {
        max: {
          field: 'mag',
        },
      },
      average_of_depth: {
        avg: {
          field: 'depth',
        },
      },
      magnitudes: {
        terms: {
          field: 'mag',
          size: 10,
        },
      },
      typeAgg: {
        terms: {
          field: 'type',
          size: 10,
        },
      },
      group_by_date: {
        date_histogram: {
          field: '@timestamp',
          calendar_interval: '1d',
          format: 'yyyy-MM-dd',
        },
      },
      places: {
        terms: {
          field: 'place.keyword',
          size: 10000,
        },
      },
    },
    sort: [
      {
        '@timestamp': {
          order: 'desc',
        },
      },
    ],
  };
};

export const geoPointsQuery = (
  startDate: string,
  endDate: string,
  search: string,
) => {
  console.log(startDate, endDate);
  let filter: any = {
    match_all: {},
  };
  let searchFilter: any = {};
  if (search && search.trim().length > 0) {
    searchFilter = {
      must: [
        {
          match: {
            place: search,
          },
        },
      ],
    };

    filter = {
      bool: searchFilter,
    };
  }
  if (startDate != 'undefined' && endDate != 'undefined') {
    filter = {
      bool: {
        ...searchFilter,
        filter: [
          {
            range: {
              '@timestamp': {
                gte: startDate,
                lte: endDate,
                format: 'yyyy/MM/dd',
              },
            },
          },
        ],
      },
    };
  }

  console.log(filter);
  return {
    track_total_hits: true,
    size: 1000,
    query: filter,
    fields: ['coordinates'],
  };
};
