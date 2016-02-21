import sitemapUrlSet from 'sitemap-urlset';

export default class UrlSetOrchestrator {
  static get(themes) {
    return new Promise((resolve, rejected) => {
      let urlSets = {
        status: true,
        themes: []
      };

      themes.forEach(theme => {
        let themeUrlSet = {
          name: theme.name,
          status: true
        };
        const result = sitemapUrlSet.do(theme.urls);

        if (result.status) {
          themeUrlSet.urlSets = result.urlSets;
        } else {
          urlSets.status = false;
          themeUrlSet.status = false;
          themeUrlSet.messages = result.messages;
        }
        urlSets.themes.push(themeUrlSet);
      });

      if (urlSets.status) {
        resolve(urlSets.themes);
      } else {
        rejected(this._filterBadStatus(urlSets));
      }
    });
  }

  static _filterBadStatus(urlSets) {
    return urlSets.themes.filter(urlSet => {
      return !urlSet.status;
    });
  }
}
