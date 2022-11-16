#!/usr/bin/env bash
# Example:
#    ./db.sh up
#    ./db.sh down

wait-dbs(){
	wait-until-healthy 'collectionsPostgres'
	wait-until-healthy 'collectionsMongoDB'
	wait-until-healthy 'collectionsInsight'
	wait-until-healthy 'collectionsOracle' 600
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
	

	docker exec -it collectionsOracle sqlplus system/password @/home/oracle/setup/custom_scripts/init.sql
	# Error ORA-12637
	docker exec collectionsOracle "/bin/sh" -c "echo DISABLE_OOB=ON>>/opt/oracle/oradata/dbconfig/ORCLCDB/sqlnet.ora"
	docker restart collectionsOracle 
}

up(){
	docker-compose up -d
	wait-dbs
	create_db_users
	echo "INFO: Databases instances is ready for tests."
}


down(){	
	docker-compose down --remove-orphans
	sudo chmod 755 ./volume/*
	sudo rm -fR ./volume
	docker volume rm collections_oradata	
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