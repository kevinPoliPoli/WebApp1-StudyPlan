-- SQLite

-- drop the existing tables
drop table courses;
drop table users;

-- define the two tables
CREATE TABLE IF NOT EXISTS courses (code VARCHAR PRIMARY KEY, name VARCHAR NOT NULL, credits INTEGER NOT NULL, maxStudents INTEGER , enrolled INTEGER NOT NULL, incompatibleWith VARCHAR, preparatoryCourse VARCHAR);
CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL, surname VARCHAR NOT NULL, finalPlanCredits INTEGER, finalPlan VARCHAR, fullTime INTEGER , email VARCHAR NOT NULL, salt VARCHAR NOT NULL, password TEXT NOT NULL);

-- insert into users
INSERT INTO users (id, name, surname, finalPlanCredits, finalPlan, fullTime, email, salt, password) VALUES (1,	'mike',	    'appato'	,   0,      '[]',	null,   'mikeappato@gmail.com',	'1y12ze18l2v21gt0',	'9b728bfc246431c4b6f54aa9539c9a4b02fb3a3c733dc8f0d9d8b822965df771');
INSERT INTO users (id, name, surname, finalPlanCredits, finalPlan, fullTime, email, salt, password) VALUES (2,	'kevin',	'cardinale',	0,      '[]',	null,   'kevincardinale@gmail.com',	'1e12fe1262v21gty',	'038bb9ba44a21544418c3d18eeb59cfb4da648241d6d903d083e5b449d5237c3');
INSERT INTO users (id, name, surname, finalPlanCredits, finalPlan, fullTime, email, salt, password) VALUES (3,	'marco',	'vangelo',	    0,      '[]',	null,   'marcovangelo@gmail.com',	    '1e12fe5262v21gty',	'3416c1b632f64427fec011f7f7c0420d0dfb7c5fdf625a9aabf63790a12abe95');
INSERT INTO users (id, name, surname, finalPlanCredits, finalPlan, fullTime, email, salt, password) VALUES (4,	'zorro',	'spada',	    0,      '[]',	null,   'zorrospada@gmail.com',	    '1112fe5262v21gty',	'78122c7aef4be0a8d4d3325af28d58105752fafc9b74efd46ceab89b502563b2');
INSERT INTO users (id, name, surname, finalPlanCredits, finalPlan, fullTime, email, salt, password) VALUES (5,	'luisa',	'sal',	        0,      '[]',	null,   'luisasal@gmail.com',	    '1112fe5262v21zty',	'033fd6c5330b6cc7027aae3cc1b5ea4a8bb31e28c08949b2ba1ad7dce1744f8a');
INSERT INTO users (id, name, surname, finalPlanCredits, finalPlan, fullTime, email, salt, password) VALUES (6,	'giulia',	'giaquinto',	0,      '[]',	null,   'giuliagiaquinto@gmail.com',	'111pfe5262v21zty',	'cf7a4bd02fc64948e049a7d9d95a3c96cb4e1eeb02e9a20946bc4a6041d5618c');

-- insert into courses
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('02GOLOV', 'Architetture dei sistemi di elaborazione',        12 ,    null ,  0,  '["02LSEOV"]',                  '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('02LSEOV', 'Computer architectures',                          12 ,    null ,  0,  '["02GOLOV"]',                  '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01SQJOV', 'Data Science and Database Technology',            8,      null,   0,  '["01SQMOV", "01SQLOV"]',       '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01SQMOV', 'Data Science e Tecnologie per le Basi di Dati',   8 ,     null ,  0,  '["01SQJOV", "01SQLOV"]',       '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01SQLOV', 'Database systems',                                8,      null,   0,  '["01SQJOV", "01SQMOV"]',       '[]' );
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01OTWOV', 'Computer network technologies and services',      6 ,     3,      0,  '["02KPNOV"]',                  '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('02KPNOV', 'Tecnologie e servizi di rete',                    6,      3,      0,  '["01OTWOV"]',                  '[]' );
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01TYMOV', 'Information systems security services',           10 ,    null ,  0,  '["01UDUOV"]',                  '[]' );
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01UDUOV', 'Sicurezza dei sistemi informativi',               10,     null,   0,  '["01TYMOV"]',                  '[]' );
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('05BIDOV', 'Ingegneria del software',                         6 ,     null ,  0,  '["04GSPOV"]',                  '["02GOLOV"]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('04GSPOV', 'Software engineering',                            6 ,     null ,  0,  '["05BIDOV"]',                  '["02LSEOV"]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01UDFOV', 'Applicazioni Web I',                              6,      null,   0,  '["01TXYOV"]',                  '[]' );
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01TXYOV', 'Web Applications I',                              6,      3,      0,  '["01UDFOV"]',                  '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01TXSOV', 'Web Applications II',                             6 ,     null ,  0,  '[]',                           '["01TXYOV"]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('02GRSOV', 'Programmazione di sistema',                       6,      null,   0,  '["01NYHOV"]',                  '[]' );
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01NYHOV', 'System and device programming',                   6 ,     3 ,     3,  '["02GRSOV"]',                  '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01SQOOV', 'Reti Locali e Data Center',                       6,      null,   0,  '[]',                           '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01TYDOV', 'Software networking',                             7,      null,   0,  '[]',                           '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('03UEWOV', 'Challenge',                                       5 ,     null ,  0,  '[]',                           '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01URROV', 'Computational intelligence',                      6,      null ,  0,  '[]',                           '[]' );
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01OUZPD', 'Model based software design',                     4 ,     null,   0,  '[]',                           '[]');
INSERT INTO courses (code, name, credits, maxStudents, enrolled, incompatibleWith, preparatoryCourse) VALUES ('01URSPD', 'Internet Video Streaming',                        6,      2,      2,  '[]',                           '[]');




