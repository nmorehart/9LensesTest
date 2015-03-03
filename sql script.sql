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

/*GET DATAPOINTS DATA*/
DELIMITER $$
CREATE DEFINER=`nmorehart`@`%` PROCEDURE `pGetTotalDataPoints`()
BEGIN
  SELECT TotalDataPoints
    FROM DataPoints;
END$$
DELIMITER ;

/*UPDATE DATAPOINTS DATA*/
DELIMITER $$
CREATE DEFINER=`nmorehart`@`%` PROCEDURE `pUpdateTotalDataPoints`(IN totalDataPoints INT)
BEGIN
  UPDATE DataPoints
     SET TotalDataPoints = totalDataPoints;
END$$
DELIMITER ;
