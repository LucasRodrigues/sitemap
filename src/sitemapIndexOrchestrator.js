import sitemapIndex from 'sitemap-index';

export default class SitemapIndexOrchestrator {

  static get(themes) {
    return new Promise((resolve, rejected) => {
      let indexesInput = this._createIndexPerTheme(themes);
      const result = sitemapIndex.do(indexesInput);

      if (result.status) {
        resolve({
          urlSets: themes,
          indexes: result.indexes
        });
      } else {
        rejected({
          messages: result.messages
        });
      }
    });
  }

  static _createIndexPerTheme(themes) {
    let indexes = [];

    themes.forEach(theme => {
      for (let i = 0, lengthI = theme.urlSets.length; i < lengthI; i++) {
        indexes.push({
          loc: `http://base/${theme.name}/index_${i}.xml`
        });
      }
    });

    return indexes;
  }
}
