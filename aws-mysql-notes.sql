-- log into mysql database
-- $ mysql -h uwbwfe.chqag5srs91z.us-west-2.rds.amazonaws.com -P 3306 -u root -p

-- switch to WFE database
USE uwbwfe;

-- verify tables
SELECT DATABASE();

-- for creating user_account table
CREATE TABLE `user_account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `permissions` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8;

-- see tables
SHOW TABLES;

-- add test user_account value
INSERT INTO user_account (
    `id`,
    `first_name`,
    `last_name`,
    `email`,
    `password`,
    `permissions`
) VALUES (
    1,
    'Test',
    'Testerson',
    'test@test.com',
    'wfe123',
    'root'
);