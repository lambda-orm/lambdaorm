const ConfigExtends = require("config-extends");
(async () => { 
    await ConfigExtends.apply('config/language/model.yaml','src/parser/config.json');
    await ConfigExtends.apply('config/language/sql','src/language/sql/config.json');
    await ConfigExtends.apply('config/language/nosql','src/language/nosql/config.json');
})();