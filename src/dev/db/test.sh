#!/usr/bin/env bash

docker exec -it lambdaORM-Oracle-19 sqlplus system/password@ORCLCDB
conn sys/password as sysdba; 
alter session set "_ORACLE_SCRIPT"=true;
CREATE TABLESPACE northwind DATAFILE 'northwind.dat' SIZE 100M AUTOEXTEND ON;
CREATE USER northwind IDENTIFIED BY northwind DEFAULT TABLESPACE northwind QUOTA UNLIMITED ON northwind;
GRANT ALL PRIVILEGES TO northwind;
exit; 