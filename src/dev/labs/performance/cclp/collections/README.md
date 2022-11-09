# Migration

## Plan

- Exportar los diferentes módulos
- Mejorar el modelo
- Migrar al nuevo modelo
- Desarrollar un nuevo servicio usando Kotlin

## Install

``` sh
docker-compose up -d
```

### Postgres

 Create users:

```sql
CREATE ROLE "LOCATIONS" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'LOCATIONS';
CREATE ROLE "PARTIES" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'PARTIES';
CREATE ROLE "PARTY_ROLES" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'PARTY_ROLES';
CREATE ROLE "LEDGER_ACCOUNTS" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'LEDGER_ACCOUNTS';
CREATE ROLE "DEBTORS" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'DEBTORS';
```

### Oracle

Create users:

```sql
--https://www.discoduroderoer.es/solucion-a-ora-65096-invalid-common-user-or-role-name-en-oracle/
alter session set "_ORACLE_SCRIPT"=true;

create user LOCATIONS identified by LOCATIONS;
create user PARTIES identified by PARTIES;
create user PARTY_ROLES identified by PARTY_ROLES;
create user LEDGER_ACCOUNTS identified by LEDGER_ACCOUNTS;
create user DEBTORS identified by DEBTORS;
```

Permissions:

```sql
GRANT create session,create table,create view,create sequence TO LOCATIONS;
GRANT create session,create table,create view,create sequence TO PARTIES;
GRANT create session,create table,create view,create sequence TO PARTY_ROLES;
GRANT create session,create table,create view,create sequence TO LEDGER_ACCOUNTS;
GRANT create session,create table,create view,create sequence TO DEBTORS;

ALTER USER LOCATIONS quota unlimited on USERS;
ALTER USER PARTIES quota unlimited on USERS;
ALTER USER PARTY_ROLES quota unlimited on USERS;
ALTER USER LEDGER_ACCOUNTS quota unlimited on USERS;
ALTER USER DEBTORS quota unlimited on USERS;
```

## uninstall

``` sh
docker-compose down --remove-orphans
```
