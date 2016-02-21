import UrlSetDispatcher from './urlSetDispatcher';
import IndexDispatcher from './indexDispatcher';

export default class Dispatcher{
  static do(path, content){
    return new Promise((resolve,rejected)=>{
      IndexDispatcher.do(path,content.indexes)
        .then(()=> {
          return UrlSetDispatcher.do(path,content.urlSets);
        })
        .then(() => {
          resolve();
        })
        .catch(err => {
          rejected(err);
        })
    });
  }
}