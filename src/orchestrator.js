import UrlSetOrchestrator from './urlSetOrchestrator';
import SiteMapIndexOrchestrator from './sitemapIndexOrchestrator';
import Dispatcher from './dispatchers/dispatcher';

export default class Orchestrator {

  static do(configuration) {
    return new Promise((resolve, rejected) => {
      UrlSetOrchestrator.get(configuration.themes)
        .then(urlSets => {
          return SiteMapIndexOrchestrator.get(configuration.domain, urlSets);
        })
        .then(output => {
          return Dispatcher.do(configuration.path, output);
        })
        .then(() => {
          resolve();
        })
        .catch(error => {
          rejected(error);
        });
    });
  }
}
