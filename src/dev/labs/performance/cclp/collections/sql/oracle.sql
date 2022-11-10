conn sys/password as sysdba;

alter session set "_ORACLE_SCRIPT"=true;

CREATE USER COLLECTIONS IDENTIFIED BY COLLECTIONS;

GRANT ALL PRIVILEGES TO COLLECTIONS;

-- Create users

create user LOCATIONS identified by LOCATIONS;

create user PARTIES identified by PARTIES;

create user PARTY_ROLES identified by PARTY_ROLES;

create user LEDGER_ACCOUNTS identified by LEDGER_ACCOUNTS;

create user DEBTORS identified by DEBTORS;

-- Permissions

GRANT create session,
create table,
create view
,
    create sequence TO LOCATIONS;

GRANT create session,
create table,
create view
,
    create sequence TO PARTIES;

GRANT create session,
create table,
create view
,
    create sequence TO PARTY_ROLES;

GRANT create session,
create table,
create view
,
    create sequence TO LEDGER_ACCOUNTS;

GRANT create session,
create table,
create view
,
    create sequence TO DEBTORS;

ALTER USER LOCATIONS quota unlimited on USERS;

ALTER USER PARTIES quota unlimited on USERS;

ALTER USER PARTY_ROLES quota unlimited on USERS;

ALTER USER LEDGER_ACCOUNTS quota unlimited on USERS;

ALTER USER DEBTORS quota unlimited on USERS;

exit;