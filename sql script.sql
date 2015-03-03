CREATE DATABASE NineLenses;

USE NineLenses;

/*CREATE TABLE*/
CREATE TABLE `DataPoints` (
  `TotalDataPoints` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*INSERT INITAL VALUE*/
INSERT INTO `NineLenses`.`DataPoints`
(`TotalDataPoints`)
VALUES
(0);
