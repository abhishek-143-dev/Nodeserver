const dbConfig = require("../DB/DB");
const Sequelize = require("sequelize");
 class Test{
        constructor(){
            this.mode = 0;
            
        }
        setMode(mode){
            this.mode = mode;
        }
        getMode(){
            return this.mode;
        }
        async getsearch(){
            try {
                const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
                    host: 'ICSOFTERPSERVER',
                    port: dbConfig.port,
                    dialect: "mssql",
                    pool: {
                        max: 5,
                        min: 0,
                        acquire: 30000,
                        idle: 10000
                    },
                    dialectOptions: {
                        instanceName: dbConfig.server,
                        options: {
                            encrypt: false,
                            enableArithAbort: false,
                            cryptoCredentialsDetails: {
                                minVersion: 'TLSv1'
                            },
                        }
                    }
                });
                
                return sequelize;
            }
            catch (error) {
                console.log(error.code);
            }
        }
 }
module.exports = Test;