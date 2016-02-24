import UrlSetOrchestrator from './urlSetOrchestrator';
import SiteMapIndexOrchestrator from './sitemapIndexOrchestrator';

export default class Orchestrator {

  static do(configuration) {
    return new Promise((resolve, rejected) => {
      UrlSetOrchestrator.get(configuration.themes)
        .then(urlSets => {
          return SiteMapIndexOrchestrator.get(configuration.domain, urlSets);
        })
        .then(sitemap => {
          resolve(sitemap);
        })
        .catch(error => {
          rejected(error);
        });
    });
  }
}
