import UrlSetOrchestrator from './urlSetOrchestrator';
import SiteMapIndexOrchestrator from './sitemapIndexOrchestrator';
import Dispatcher from './dispatchers/dispatcher';

export default class Orchestrator {

  static do(configuration) {
    UrlSetOrchestrator.get(configuration.themes)
      .then(urlSets => {
        return SiteMapIndexOrchestrator.get(configuration.domain,urlSets);
      })
      .then(output => {
        return Dispatcher.do(configuration.path, output);
      })
      .then(() => {
        console.log('acabou');
      })
      .catch(r => {
        console.log('sss');
        console.log(r.messages[0]);
      });
  }
}