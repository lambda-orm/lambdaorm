conn sys/ORACLE123 as sysdba;

alter session set "_ORACLE_SCRIPT"=true;

CREATE USER test IDENTIFIED BY test;

GRANT ALL PRIVILEGES TO test;

exit;