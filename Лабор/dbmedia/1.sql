CREATE DATABASE `DB2` /*!40100 COLLATE 'latin1_swedish_ci' */;

CREATE TABLE `tab1` (
	`field1` INT NULL,
	`filed2` FLOAT NULL DEFAULT NULL
)
COMMENT='Моя перша таблиця'
COLLATE='latin1_swedish_ci'
;
USE `db1`;
INSERT INTO `db2`.`tab1` (`field1`, `filed2`) VALUES ('8', '6');
INSERT INTO `db2`.`tab1` (`field1`, `filed2`) VALUES ('1', '2');
ALTER TABLE `tab1`
	ADD COLUMN `TS` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP() FIRST;
ALTER TABLE `tab1`
	ADD COLUMN `inc` FLOAT NULL DEFAULT SIN('field2') AFTER `TS`;	
ALTER TABLE `tab1`
	CHANGE COLUMN `TS` `TS` TIMESTAMP NOT NULL DEFAULT current_timestamp() FIRST,
	ADD PRIMARY KEY (`TS`);	