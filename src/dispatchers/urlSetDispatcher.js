import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

export default class UrlSetDispatcher{
  static do (basePath,urlSets){
    return new Promise((resolve,rejected)=> {
      urlSets.forEach(theme => {
        const themePath = path.join(basePath, `${theme.name}`);
        mkdirp.sync(themePath);

        theme.urlSets.forEach((content,index)=> {
          const urlSetPath = `${themePath}/urlSet_${index}.xml`;

          fs.writeFileSync(urlSetPath,content)
        });
      });

      resolve();
    })
  }
}