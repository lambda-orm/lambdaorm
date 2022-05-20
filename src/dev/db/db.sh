#!/usr/bin/env bash
# Example:
#    ./db.sh up
#    ./db.sh down


# create_volumes(){
# 	docker volume create --name Source --opt type=none --opt device=~/volumes/Source --opt o=bind
# 	docker volume create --name MySQL --opt type=none --opt device=~/volumes/MySQL --opt o=bind
# 	docker volume create --name MariaDB-data --opt type=none --opt device=~/volumes/MariaDB-data --opt o=bind
# 	docker volume create --name MariaDB-log --opt type=none --opt device=~/volumes/MariaDB-log --opt o=bind
# 	docker volume create --name Postgres-data --opt type=none --opt device=~/volumes/Postgres-data --opt o=bind
# 	docker volume create --name SqlServer --opt type=none --opt device=~/volumes/SqlServer --opt o=bind
# 	docker volume create --name MongoDB --opt type=none --opt device=~/volumes/MongoDB --opt o=bind
# 	docker volume create --name OraData --opt type=none --opt device=~/volumes/OraData --opt o=bind
# }
# remove_volumes(){
# 	docker volume rm Source
# 	docker volume rm MySQL
# 	docker volume rm MariaDB-data
# 	docker volume rm MariaDB-log
# 	docker volume rm Postgres-data
# 	docker volume rm SqlServer
# 	docker volume rm MongoDB
# 	docker volume rm OraData
# }

wait-until-healthy(){
	./wait-until-healthy.sh lambdaORM-Source
	./wait-until-healthy.sh lambdaORM-MySQL-57
	./wait-until-healthy.sh lambdaORM-Postgres-10
	./wait-until-healthy.sh lambdaORM-MariaDB-103
	./wait-until-healthy.sh lambdaORM-MongoDB	
	./wait-until-healthy.sh lambdaORM-SqlServer
	./wait-until-healthy.sh lambdaORM-Oracle-19	
}

create_db_users(){
	docker exec lambdaORM-Source  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'test';"
	docker exec lambdaORM-Source  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"

	docker exec lambdaORM-MySQL-57  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'test';"
	docker exec lambdaORM-MySQL-57  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"

	docker exec lambdaORM-MariaDB-103  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'test';"
	docker exec lambdaORM-MariaDB-103  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"

	docker exec lambdaORM-SqlServer /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Lambda1234!" -Q "CREATE DATABASE northwind; ALTER DATABASE northwind SET READ_COMMITTED_SNAPSHOT ON;"

  docker exec lambdaORM-Oracle-19 sqlplus system:password@ORCLCDB "CREATE USER northwind IDENTIFIED BY northwind;"

	docker exec -it lambdaORM-Oracle-19 sqlplus system/password@ORCLCDB "CREATE USER 'northwind' IDENTIFIED BY 'northwind';"

	

# https://community.bmc.com/s/article/Remedy-Server-Error-ORA-65096-invalid-common-user-or-role-name-installing-ARS-9-1-on-Oracle-12c#:~:text=The%20error%20ORA%2D65096%3A%20invalid,name%20is%20a%20Oracle%20error.&text=Cause%3A%20An%20attempt%20was%20made,for%20common%20users%20or%20roles.
  docker exec -it lambdaORM-Oracle-19 sqlplus sysdba/password@ORCLCDB

  docker exec -it lambdaORM-Oracle-19 sqlplus sysdba/password@ORCLCDB
  conn sys/password as sysdba; 
	alter session set "_ORACLE_SCRIPT"=true;
	CREATE TABLESPACE northwind DATAFILE 'northwind.dat' SIZE 100M AUTOEXTEND ON;
	CREATE USER northwind IDENTIFIED BY northwind DEFAULT TABLESPACE northwind QUOTA UNLIMITED ON northwind;
  GRANT ALL PRIVILEGES TO northwind;
	exit; 
}

up(){
	docker-compose up -d
	wait-until-healthy
	create_db_users
	echo "INFO: Databases instances is ready for tests."
}


down(){	
	docker-compose down --remove-orphans
	sudo chmod 755 ./volume/*
	sudo rm -fR ./volume/*
	echo "INFO: stopped Databases (if it was running)."
}



# set action
ACTION="${1^^}"
if [ -z "$ACTION" ]; then
    ACTION="UP"
fi

case "${ACTION}" in
  "UP")    
    up
  ;;
  "DOWN")    
    down
  ;;
esac