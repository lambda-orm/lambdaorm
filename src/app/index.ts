import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import router from "./routes";
import orm  from "./../orm"
const ConfigExtends = require("config-extends");

const app: Application = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

(async () => { 
    try {

      let schemas =  await ConfigExtends.apply('test/config/schema');
      for(const p in schemas){
          let schema =  schemas[p];
          orm.schema.load(schema);
      }

      let cnx = {name:'northwind',dialect:'mysql',schema:'northwind',connectionString:'mysql://root:root@0.0.0.0:3306/northwind'};
      orm.connection.load(cnx);


      const host = process.env.HOST || 'http://localhost';
      const port = process.env.PORT || '8000';  

      app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(undefined, {
          swaggerOptions: {
            url: "/swagger.json",
          },
        })
      );

      app.use(router);

      app.listen(port);
      console.log('Server running at: '+host+':'+port+'/docs'); 
      process.exitCode = 0;
      return 0;
    }
    catch (error) {     
        console.error(error);  
        process.exitCode = -1;
        return -1;
    }    
})();


