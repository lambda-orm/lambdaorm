#!/usr/bin/env bash
# Example:
#    ./db.sh up
#    ./db.sh down

wait-dbs(){
	wait-until-healthy 'northwind-source'
	wait-until-healthy 'northwind-mysql'
	wait-until-healthy 'northwind-postgres'
	# wait-until-healthy 'northwind-mariadb'
	wait-until-healthy 'northwind-oracle' 300
	# wait-until-healthy 'northwind-sqlserver'	
	# wait-until-healthy 'northwind-mongodb'			
}

wait-until-healthy(){
	if [ ! -z "$1" ]; then
		IMAGE=$1
	else
		>&2 echo "Please provide the container name or hash"
		exit 1
	fi

	# set waiting time 
	if [ ! -z "$2" ]; then
			TIME=($2 / 50)
	else
			TIME=1.2   
	fi

	for _ in {1..50}
	do
		state=$(docker inspect -f '{{ .State.Health.Status }}' ${IMAGE} 2>&1)
		return_code=$?
		if [ ${return_code} -eq 0 ] && [ "$state" == "healthy" ]; then
			echo "${IMAGE} is healthy!"
			return
		fi
		sleep ${TIME}
	done

	>&2 echo "Timeout, exceeded when waiting for container to be healthy: ${IMAGE}"
	exit 1
}

create_db_users(){
	docker exec northwind-source  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'test';"
	docker exec northwind-source  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"

	docker exec northwind-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'test';"
	docker exec northwind-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"

	docker exec northwind-mariadb mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "CREATE USER IF NOT EXISTS 'test'@'%' IDENTIFIED BY 'test';"
	docker exec northwind-mariadb mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'test'@'%' with grant option; FLUSH PRIVILEGES;"

	docker exec northwind-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P "Lambda1234!" -Q "CREATE DATABASE northwind; ALTER DATABASE northwind SET READ_COMMITTED_SNAPSHOT ON;"

  # https://community.bmc.com/s/article/Remedy-Server-Error-ORA-65096-invalid-common-user-or-role-name-installing-ARS-9-1-on-Oracle-12c#:~:text=The%20error%20ORA%2D65096%3A%20invalid,name%20is%20a%20Oracle%20error.&text=Cause%3A%20An%20attempt%20was%20made,for%20common%20users%20or%20roles.
  # TODO: solve "Error executing child process: Error: Process exited with code 127"

	docker exec -it northwind-oracle sqlplus system/ORACLE123 @/home/oracle/setup/custom_scripts/startup.sql
	# Error ORA-12637
	docker exec northwind-oracle "/bin/sh" -c "echo DISABLE_OOB=ON>>/opt/oracle/oradata/dbconfig/ORCLCDB/sqlnet.ora"
	docker restart northwind-oracle  
}

up(){
	docker compose -p "northwind" up -d
	wait-dbs
	create_db_users
	echo "INFO: Databases instances is ready for tests."
}

down(){	
	docker compose -p "northwind" down --remove-orphans
	docker volume rm northwind_source-data
	docker volume rm northwind_source-log
	docker volume rm northwind_mysql-data
	docker volume rm northwind_mysql-log
	docker volume rm northwind_postgres-data
	docker volume rm northwind_sqlserver
	docker volume rm northwind_oracle_oradata
	docker volume rm northwind_mongodb
	docker volume rm northwind_mariadb-data
	docker volume rm northwind_mariadb-log
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