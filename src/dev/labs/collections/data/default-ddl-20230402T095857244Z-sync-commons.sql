CREATE TABLE tbl_com_currencies (id VARCHAR(16) NOT NULL ,name VARCHAR(60) NOT NULL ,symbol VARCHAR(3) NOT NULL ,CONSTRAINT tbl_com_currencies_PK PRIMARY KEY (id));
CREATE TABLE tbl_iam_groups (created_by VARCHAR(50)  ,id VARCHAR(32) NOT NULL ,name VARCHAR(32) NOT NULL ,created DATETIME  ,CONSTRAINT tbl_iam_groups_PK PRIMARY KEY (id));
ALTER TABLE tbl_iam_groups ADD CONSTRAINT tbl_iam_groups_UK UNIQUE (name);
CREATE TABLE tbl_iam_group_users (group_id VARCHAR(32) NOT NULL ,id VARCHAR(64) NOT NULL ,username VARCHAR(32) NOT NULL ,role VARCHAR(32)  ,CONSTRAINT tbl_iam_group_users_PK PRIMARY KEY (id));
ALTER TABLE tbl_iam_group_users ADD CONSTRAINT tbl_iam_group_users_UK UNIQUE (group_id,username);