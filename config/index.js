const ConfigExtends = require("config-extends");
(async () => { 
    await ConfigExtends.apply('config/language/model.yaml','src/config/model.json');
    await ConfigExtends.apply('config/language/sql','src/config/sql.json');
})();