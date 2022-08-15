conn sys/password as sysdba;

alter session set "_ORACLE_SCRIPT"=true;

CREATE USER northwind IDENTIFIED BY northwind;

GRANT ALL PRIVILEGES TO northwind;

exit;