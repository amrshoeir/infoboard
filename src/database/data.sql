
-- user table entries

INSERT INTO user(username,password,name,email,role) VALUES ('sheira','########','Amr Sheir','amr.sheir@pte.hu','admin');
INSERT INTO user(username,password,name,email,role) VALUES ('laborcig','########','Laborci Gergely','laborci.gergely@pte.hu','admin');
INSERT INTO user(username,password,name,email,role) VALUES ('lenarta','########','Lenart Anett','lenart.anett@pte.hu','content_creator');
INSERT INTO user(username,password,name,email,role) VALUES ('szajcsansz','########','Szajcsan Szabolcs','szajcsancontent.szabolcs@pte.hu','content_creator');
INSERT INTO user(username,password,name,email,role) VALUES ('peteri','########','Peter Ivanyi','peter.ivanyi@pte.hu','admin');
INSERT INTO user(username,password,name,email,role) VALUES ('sariz','########','Sari Zoltan','sari.zoltan@pte.hu','content_creator');
INSERT INTO user(username,password,name,email,role) VALUES ('gyurakg','########','Gyurak Gabor','gyurak.gabor@pte.hu','content_creator');
INSERT INTO user(username,password,name,email,role) VALUES ('test1','########','Test 1','test1@test','inactive');
INSERT INTO user(username,password,name,email,role) VALUES ('test3','########','Test 3','test3@test','inactive');
INSERT INTO user(username,password,name,email,role) VALUES ('test2','########','Test 2','test2@test','inactive');



-- predefined layouts

INSERT INTO layout VALUE (null,"Image",10,'{
  "title": "Image layout",
  "maxSize": "3 MB",
  "filepath": "Image/src/"
}',1000);
INSERT INTO layout VALUE (null,"Video",30,'{
  "title": "Video layout",
  "youtube": "",
  "maxSize": "10 MB",
  "filepath": "Video/src/"
}
',1000);
INSERT INTO layout VALUE (null,"Gallery",15,'{
  "description": "Gallery layout",
  "maxCount": 5,
  "maxSize": "3 MB",
  "filepath": "Gallery/src/",
  "durationPerImg": 5,
  "defaultTransition": "fade"
}',1000);
