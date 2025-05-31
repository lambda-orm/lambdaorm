#!/usr/bin/env bash
# Example:
#    ./db.sh up
#    ./db.sh down

wait-dbs(){
	wait-until-healthy 'countries-mysql'
	wait-until-healthy 'countries-postgres'		
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
	docker exec countries-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "ALTER DATABASE countries CHARACTER SET utf8 COLLATE utf8_general_ci;"
	docker exec countries-mysql  mysql --host 127.0.0.1 --port 3306 -uroot -proot -e "GRANT ALL ON *.* TO 'countries'@'%' with grant option; FLUSH PRIVILEGES;"  
}

up(){
	docker compose -p "countries" up -d
	wait-dbs
	create_db_users
	echo "INFO: Databases instances is ready for tests."
}


down(){	
	docker compose -p "countries" down --remove-orphans
	docker volume rm countries_mysql-data
	docker volume rm countries_mysql-log
	docker volume rm countries_postgres-data
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