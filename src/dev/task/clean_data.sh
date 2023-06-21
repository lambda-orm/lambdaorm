#!/usr/bin/env bash

IFS="," read -a databases <<< $1
for database in "${databases[@]}"
do
  rm -f ./../../../data/${database}-data.json
	rm -f ./../../../data/${database}-model.json
	rm -f ./../../../data/${database}-ddl-*.sql
	rm -f ./../../../data/${database}-export.json
done
rm -f ./../../../data/Source-data.json
rm -f ./../../../data/Source-model.json
rm -f ./../../../data/Source-ddl-*.sql
rm -f ./../../../data/Source-export.json