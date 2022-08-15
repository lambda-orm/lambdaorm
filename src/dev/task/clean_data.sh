#!/usr/bin/env bash

IFS="," read -a databases <<< $1
for database in "${databases[@]}"
do
  rm -f ./../../../data/${database}-state.json
	rm -f ./../../../data/${database}-ddl-*.txt
	rm -f ./../../../data/${database}-export.json
done
rm -f ./../../../data/Source-ddl-*.txt
rm -f ./../../../data/Source-export.json