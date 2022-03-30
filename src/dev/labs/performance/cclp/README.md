## CCLP

## install databases

``` sh
docker-compose up -d
```

### Postgres

 Create users:

```sql
CREATE ROLE "CCLP_LOCATIONS" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'CCLP_LOCATIONS';
CREATE ROLE "CCLP_PARTIES" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'CCLP_PARTIES';
CREATE ROLE "CCLP_PARTY_ROLES" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'CCLP_PARTY_ROLES';
CREATE ROLE "CCLP_LEDGER_ACCOUNTS" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'CCLP_LEDGER_ACCOUNTS';
CREATE ROLE "CCLP_DEBTORS" SUPERUSER CREATEDB CREATEROLE INHERIT LOGIN PASSWORD 'CCLP_DEBTORS';
```

### Oracle

Install:

- [Oracle Database XE](https://www.oracle.com/es/database/technologies/appdev/xe.html)
- [download](https://www.oracle.com/database/technologies/xe18c-downloads.html)
- [download sqlplus](https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html)

user: system
password: flavio

Create users:

```sql
--https://www.discoduroderoer.es/solucion-a-ora-65096-invalid-common-user-or-role-name-en-oracle/
alter session set "_ORACLE_SCRIPT"=true;

create user CCLP_LOCATIONS identified by CCLP_LOCATIONS;
create user CCLP_PARTIES identified by CCLP_PARTIES;
create user CCLP_PARTY_ROLES identified by CCLP_PARTY_ROLES;
create user CCLP_LEDGER_ACCOUNTS identified by CCLP_LEDGER_ACCOUNTS;
create user CCLP_DEBTORS identified by CCLP_DEBTORS;
```

Permissions

```sql
GRANT create session,create table,create view,create sequence TO CCLP_LOCATIONS;
GRANT create session,create table,create view,create sequence TO CCLP_PARTIES;
GRANT create session,create table,create view,create sequence TO CCLP_PARTY_ROLES;
GRANT create session,create table,create view,create sequence TO CCLP_LEDGER_ACCOUNTS;
GRANT create session,create table,create view,create sequence TO CCLP_DEBTORS;

ALTER USER CCLP_LOCATIONS quota unlimited on USERS;
ALTER USER CCLP_PARTIES quota unlimited on USERS;
ALTER USER CCLP_PARTY_ROLES quota unlimited on USERS;
ALTER USER CCLP_LEDGER_ACCOUNTS quota unlimited on USERS;
ALTER USER CCLP_DEBTORS quota unlimited on USERS;
```

## uninstall

``` sh
docker-compose down --remove-orphans
```
