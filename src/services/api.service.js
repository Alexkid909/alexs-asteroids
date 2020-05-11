import axios from 'axios';

export default class {
  constructor() {
    this.api = axios.create({
      baseURL: ' https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/',
      timeout: 10000,
      headers: { },
    });
    this.responseFormat = 'json';
  }

  getExoplanets(sortOrder = 'dec') {
    const tables = [
      'pl_hostname',
      'pl_name',
      'pl_letter',
      'pl_pnum',
      'st_dist',
    ];
    const tablesString = tables.join(',');
    const url = `nph-nstedAPI?table=exoplanets&select=${tablesString}&order=${sortOrder}&format=${this.responseFormat}`;
    return this.api.get(url).then((response) => response.data);
  }

  getExoplanetSystems() {
    this.getExoplanets().then((exoplanets) => {
      console.log('exoplanets', exoplanets);
    });
  }
}
