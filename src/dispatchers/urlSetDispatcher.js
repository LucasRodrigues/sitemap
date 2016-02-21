import fs from 'fs';
import mkdirp from 'mkdirp';

export default class UrlSetDispatcher{
  static do (path,urlSets){
    return new Promise((resolve,rejected)=> {
      urlSets.forEach(theme => {
        const themePath = path + `${theme.name}`;
        mkdirp.sync(themePath);

        theme.urlSets.forEach((content,index)=> {
          const urlSetPath = `${themePath}/${index}.xml`;

          fs.writeFileSync(urlSetPath,content);
        });
      });

      resolve();
    })
  }
}