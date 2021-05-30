const ConfigExtends = require("config-extends");
(async () => { 


    await ConfigExtends.apply('lib/config/language/model.yaml','lib/config/model.json');
    await ConfigExtends.apply('lib/config/language/sql','lib/config/sql.json');



})();