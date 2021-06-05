const ConfigExtends = require("config-extends");
(async () => { 
    await ConfigExtends.apply('config/language/model.yaml','dist/config/model.json');
    await ConfigExtends.apply('config/language/sql','dist/config/sql.json');
})();