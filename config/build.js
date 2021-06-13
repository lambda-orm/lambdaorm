const ConfigExtends = require("config-extends");
(async () => { 
    await ConfigExtends.apply('config/language/model.yaml','src/base/model.json');
    await ConfigExtends.apply('config/language/sql','src/language/sql/sql.json');
})();