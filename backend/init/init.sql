-- Tạo databases
CREATE DATABASE IF NOT EXISTS userdb;
CREATE DATABASE IF NOT EXISTS otpdb;

-- Cấp quyền cho user thường
-- CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'userpassword';
-- GRANT ALL PRIVILEGES ON userdb.* TO 'user'@'%';
-- GRANT ALL PRIVILEGES ON otpdb.* TO 'user'@'%';
-- FLUSH PRIVILEGES;
