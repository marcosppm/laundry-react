CREATE DATABASE laundry_db;
USE laundry_db;

CREATE TABLE residence (code VARCHAR(10));
CREATE TABLE machine_types (code INTEGER, description VARCHAR(20));
CREATE TABLE machine (number INTEGER, type INTEGER, residence VARCHAR(10), finish DATE);

-- Add PKs
ALTER TABLE residence ADD PRIMARY KEY (code);
ALTER TABLE machine_types ADD PRIMARY KEY (code);
ALTER TABLE machine ADD CONSTRAINT pk_machine PRIMARY KEY (number, type, residence);

-- Add FKs
ALTER TABLE machine ADD FOREIGN KEY (type) REFERENCES machine_types(code);
ALTER TABLE machine ADD FOREIGN KEY (residence) REFERENCES residence(code);

-- Initial data
-- ###########
-- Residences
-- ###########
INSERT INTO residence VALUES ('1');
INSERT INTO residence VALUES ('4B');
INSERT INTO residence VALUES ('4DD');

-- ###########
-- Machine types
-- ###########
INSERT INTO machine_types VALUES (1, 'Washing');
INSERT INTO machine_types VALUES (2, 'Drying');

-- ###########
-- Machines (Washing)
-- ###########
INSERT INTO machine VALUES (1, 1, '1', null);
INSERT INTO machine VALUES (2, 1, '1', null);
INSERT INTO machine VALUES (1, 1, '4B', null);
INSERT INTO machine VALUES (1, 1, '4DD', null);
INSERT INTO machine VALUES (2, 1, '4DD', null);
INSERT INTO machine VALUES (3, 1, '4DD', null);
