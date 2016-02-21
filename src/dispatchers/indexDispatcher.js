import fs from 'fs';
import mkdirp from 'mkdirp';

export default class IndexDispatcher{
  static do(path,indexes){
    return new Promise((resolve,rejected)=>{
      indexes.forEach((content,index) => {
        const indexPath = `${path}/${index}.xml`;
        fs.writeFileSync(indexPath,content);
      });

      resolve();
    });

  }
}