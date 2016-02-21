import UrlSetDispatcher from './urlSetDispatcher';
import IndexDispatcher from './indexDispatcher';
import mkdirp from 'mkdirp';
import path from 'path';

export default class Dispatcher{
  static do(basePath, content){
    return new Promise((resolve,rejected)=>{
      basePath = path.join( basePath,this._folder());
      mkdirp(basePath);

      IndexDispatcher.do(basePath,content.indexes)
        .then(()=> {
          return UrlSetDispatcher.do(basePath,content.urlSets);
        })
        .then(() => {
          resolve();
        })
        .catch(err => {
          rejected(err);
        })
    });
  }

  static _folder(){
    const date = new Date();

    return `${date.getFullYear()}_${date.getMonth()+1}_`+
      `${date.getDate()}_${date.getHours()}_${date.getMinutes()}_` +
      `${date.getSeconds()}_sitemap`
  }
}