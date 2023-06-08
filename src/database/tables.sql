-- Creating user table

CREATE TABLE IF NOT EXISTS User(
id INT NOT NULL AUTO_INCREMENT,
username VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(60) NOT NULL,
name VARCHAR(255),
email VARCHAR(255) NOT NULL UNIQUE,
role SET('admin','content_creator','inactive') DEFAULT 'content_creator',
PRIMARY KEY(id)
);

-- Creating layout table

CREATE TABLE IF NOT EXISTS Layout(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
duration SMALLINT NOT NULL DEFAULT 15,
layout_data JSON NOT NULL,
user_id INT DEFAULT 1,
PRIMARY KEY(id),
FOREIGN KEY(user_id) 
REFERENCES User(id)
 ON DELETE SET DEFAULT
);

-- Creating content table

CREATE TABLE IF NOT EXISTS Content(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
duration INT NOT NULL DEFAULT 15,
start_time DATETIME(0) ON update now(),
end_time DATETIME(0),
content_data JSON NOT NULL,
user_id INT DEFAULT 1,
layout_id INT,
PRIMARY KEY(id),
FOREIGN KEY(user_id) REFERENCES User(id) ON DELETE SET DEFAULT,
FOREIGN KEY(layout_id) REFERENCES Layout(id) ON DELETE CASCADE
);