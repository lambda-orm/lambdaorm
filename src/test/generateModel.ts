import {orm } from '../orm'
const fs = require('fs');
const path = require('path');

(async () => { 

  try
  {     
    await orm.init(path.join(process.cwd(),'src/test/config.yaml'));
    let content = orm.database.model('source');
    fs.writeFileSync('src/lab/model.d.ts',content);
  }
  catch(error){
    console.log(error.stack)
  }
})();
