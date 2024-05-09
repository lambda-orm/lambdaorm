"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionFacadeBuilder = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const application_1 = require("../application");
const connectionPoolService_1 = require("../application/services/connectionPoolService");
const dialectPoolService_1 = require("../application/services/dialectPoolService");
const acquire_1 = require("../application/useCases/acquire");
const release_1 = require("../application/useCases/release");
const MySQL_1 = require("./adapters/MySQL");
const MariaDB_1 = require("./adapters/MariaDB");
const PostgreSQL_1 = require("./adapters/PostgreSQL");
const SQLjs_1 = require("./adapters/SQLjs");
const SqlServer_1 = require("./adapters/SqlServer");
const Oracle_1 = require("./adapters/Oracle");
const MongoDB_1 = require("./adapters/MongoDB");
class ConnectionFacadeBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(helper) {
        this.helper = helper;
    }
    build() {
        const dialectService = new dialectPoolService_1.DialectPoolService(this.helper);
        const poolService = new connectionPoolService_1.ConnectionPoolService(dialectService);
        const acquireConnection = new acquire_1.AcquireConnection(poolService);
        const releaseConnection = new release_1.ReleaseConnection(poolService);
        const connectionFacade = new application_1.ConnectionFacade(dialectService, poolService, acquireConnection, releaseConnection)
            .addDialect(lambdaorm_base_1.Dialect.MySQL, MySQL_1.MySQLConnectionPoolAdapter)
            .addDialect(lambdaorm_base_1.Dialect.MariaDB, MariaDB_1.MariaDBConnectionPoolAdapter)
            .addDialect(lambdaorm_base_1.Dialect.PostgreSQL, PostgreSQL_1.PostgreSQLConnectionPoolAdapter)
            .addDialect(lambdaorm_base_1.Dialect.SqlServer, SqlServer_1.SqlServerConnectionPoolAdapter)
            .addDialect(lambdaorm_base_1.Dialect.SQLjs, SQLjs_1.SQLjsConnectionPoolAdapter)
            .addDialect(lambdaorm_base_1.Dialect.Oracle, Oracle_1.OracleConnectionPoolAdapter)
            .addDialect(lambdaorm_base_1.Dialect.MongoDB, MongoDB_1.MongoDBConnectionPoolAdapter);
        return connectionFacade;
    }
}
exports.ConnectionFacadeBuilder = ConnectionFacadeBuilder;
//# sourceMappingURL=facadeBuilder.js.map