const ConfigExtends = require("config-extends");
(async () => { 
    await ConfigExtends.apply('config/language/model.yaml','src/base/config.json');
    await ConfigExtends.apply('config/language/sql','src/language/sql/config.json');
})();