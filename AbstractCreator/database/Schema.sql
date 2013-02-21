-- Headers {{{
SET storage_engine=MYISAM;
-- }}}
-- Users {{{
DROP TABLE IF EXISTS users;
CREATE TABLE users(
	userid int auto_increment primary key,
	email varchar(255),
	passhash char(40),
	passhash2 char(40),
	firstname varchar(100),
	lastname varchar(100),
	street varchar(100),
	suburb varchar(100),
	city varchar(100) DEFAULT 'Gold Coast',
	state varchar(100) DEFAULT 'Queensland',
	country varchar(100) DEFAULT 'Australia',
	phone varchar(50),
	postcode varchar(25),
	dob int,
	blurb text,
	lastlogin int,
	created int,
	edited int,
	method enum('site', 'import') DEFAULT 'site',
	role enum('user', 'admin') DEFAULT 'user',
	status enum('active', 'deleted') DEFAULT 'active'
);
CREATE INDEX users_email ON users(email);
CREATE INDEX users_role ON users(role);
CREATE INDEX users_status ON users(status);
CREATE FULLTEXT INDEX users_ft_fuzzy ON users(email, firstname, lastname, street, suburb, phone);
-- NOTE: passhash = <8 hex salt><md5>
-- 1ae4f82fe031f85fbff0abf9812358c755c36c2d = 'password'
INSERT INTO users VALUES (null, 'mc', '1ae4f82fe031f85fbff0abf9812358c755c36c2d', null, 'Matt', 'Carter', 'PO BOX 186', 'Varsity Lakes', 'Gold Coast', 'Queensland', 'Australia', '0422240866', '4227', '425916000', 'Programmer, systems designer and hero to the downtrodden', null, null, null, 'site', 'admin', 'active');
INSERT INTO users VALUES (null, 'vm', '1ae4f82fe031f85fbff0abf9812358c755c36c2d', null, 'Vandy', 'Mau', 'PO BOX 186', 'Varsity Lakes', 'Gold Coast', 'Queensland', 'Australia', '0422240866', '4227', '425916000', 'Manager and Futurama fan', null, null, null, 'site', 'admin', 'active');
INSERT INTO users VALUES (null, 'sk', '1ae4f82fe031f85fbff0abf9812358c755c36c2d', null, 'Sudhir', 'Kale', 'PO BOX 186', 'Varsity Lakes', 'Gold Coast', 'Queensland', 'Australia', '0422240866', '4227', '425916000', 'Manager and Futurama fan', null, null, null, 'site', 'admin', 'active');
INSERT INTO users VALUES (null, 'ms', '1ae4f82fe031f85fbff0abf9812358c755c36c2d', null, 'Mark', 'Spence', 'PO BOX 186', 'Varsity Lakes', 'Gold Coast', 'Queensland', 'Australia', '0422240866', '4227', '425916000', 'Manager and Futurama fan', null, null, null, 'site', 'admin', 'active');
-- }}}
-- Simulations {{{
-- NOTE: probaility* real values are actually just floats between 0 and 1 but MySQL insists that the significant number before the floating point be of equal length to the floating point. So (1,10) [1 number to 10 DP] is not possible
DROP TABLE IF EXISTS simulations;
CREATE TABLE simulations(
	simulationid int primary key auto_increment,
	name varchar(100),
	min float(20,5),
	max float(20,5),
	commission float(20, 5),
	iterations int,
	probabilityplayer float(10, 10),
	probabilitytie float(10, 10),
	probabilitybank float(10, 10),
	notes text,
	created int,
	lastrun int,
	status ENUM('active', 'deleted') DEFAULT 'active',
	executionstatus ENUM('pending', 'calc-pause', 'calc-action', 'calculated') DEFAULT 'pending'
);
CREATE FULLTEXT INDEX simulations_ft_fuzzy ON simulations(name);
INSERT INTO simulations VALUES (null, 'Test simulation #1', 100, 10000, 0.05, 3000, 0.44625, 0.09515, 0.4586, null, 1356958800, 1356958800, 'active', 'pending');
INSERT INTO simulations VALUES (null, 'Test simulation #2', 200, 10000, 0.05, 3000, 0.44625, 0.09515, 0.4586, null, 1356958800, 1356958800, 'active', 'pending');
INSERT INTO simulations VALUES (null, 'Test simulation #3', 100, 1000, 0.05, 3000, 0.44625, 0.09515, 0.4586, null, 1356958800, 1356958800, 'active', 'pending');
INSERT INTO simulations VALUES (null, 'Test simulation #4', 500, 500, 0.05, 3000, 0.44625, 0.09515, 0.4586, null, 1356958800, 1356958800, 'active', 'pending');
INSERT INTO simulations VALUES (null, 'Test simulation #5', 100, 20000, 0.05, 30000, 0.44625, 0.09515, 0.4586, null, 1356958800, 1356958800, 'active', 'pending');
INSERT INTO simulations VALUES (null, 'Test simulation #6', 200, 20000, 0.05, 30000, 0.44625, 0.09515, 0.4586, null, 1356958800, 1356958800, 'active', 'pending');
INSERT INTO simulations VALUES (null, 'Test simulation #7', 1, 100, 0.05, 30000, 0.44625, 0.09515, 0.4586, null, 1356958800, 1356958800, 'active', 'pending');
INSERT INTO simulations VALUES (null, 'Test simulation #8', 100, 30000, 0.05, 30000, 0.44625, 0.09515, 0.4586, null, 1356958800, 1356958800, 'active', 'pending');
INSERT INTO simulations VALUES (null, 'Test simulation #9', 100, 50000, 0.05, 30000, 0.44625, 0.09515, 0.4586, null, 1356958800, 1356958800, 'active', 'pending');
-- }}}
-- Personas {{{
DROP TABLE IF EXISTS personas;
CREATE TABLE personas(
	personaid int primary key auto_increment,
	name varchar(100),
	color varchar(10),
	pattern text,
	notes text,
	status ENUM('active', 'deleted') DEFAULT 'active'
);
INSERT INTO personas VALUES (null, 'Constant', '#cc3030', '100', null, 'active');
INSERT INTO personas VALUES (null, 'Linear', '#3ba13b', '100,200,300,400,500,600,700,800,900,1000', null, 'active');
INSERT INTO personas VALUES (null, 'Sine Wave', '#e8e845', '100,200,300,200,100,200,300,200', null, 'active');
INSERT INTO personas VALUES (null, 'Sawtooth', '#6e6eeb', '100,300,300,100', null, 'active');
-- }}}
-- Persona2Simulation {{{
-- NOTE: Whenever a simulation is run the personas table is copied into this one for the running simulation
DROP TABLE IF EXISTS personas2simulations;
CREATE TABLE personas2simulations(
	personas2simulationsid int auto_increment PRIMARY KEY,
	simulationid int,
	personaid int,
	name varchar(100),
	color varchar(10),
	pattern text,
	notes text,
	created int,
	status ENUM('active', 'deleted') DEFAULT 'active'
);
CREATE INDEX personas2simulations_simulationid ON personas2simulations(simulationid);
CREATE INDEX personas2simulations_status ON personas2simulations(status);
INSERT INTO personas2simulations VALUES (null, 1, 1, 'Constant', '#cc3030', '100', null, null, 'active');
INSERT INTO personas2simulations VALUES (null, 1, 2, 'Linear', '#3ba13b', '100,200,300,400,500,600,700,800,900,1000', null, null, 'active');
INSERT INTO personas2simulations VALUES (null, 1, 3, 'Sine Wave', '#e8e845', '100,200,300,200,100,200,300,200', null, null, 'active');
INSERT INTO personas2simulations VALUES (null, 1, 4, 'Sawtooth', '#6e6eeb', '100,300,300,100', null, null, 'active');
-- }}}
-- Logs {{{
DROP TABLE IF EXISTS logs;
CREATE TABLE logs(
	userid char(8),
	projectid char(8),
	type enum('info', 'login', 'user', 'project', 'add', 'remove', 'edit', 'picture', 'email', 'comment') DEFAULT 'info',
	text text,
	created int
);
CREATE INDEX logs_type ON logs(type);
CREATE INDEX logs_userid ON logs(userid);
CREATE INDEX logs_projectid ON logs(projectid);
-- }}}
-- SimulationStep {{{
DROP TABLE IF EXISTS simulationsteps;
CREATE TABLE simulationsteps(
	simulationid int,
	step int NOT NULL,
	winner enum('player', 'bank', 'tie') DEFAULT 'player' NOT NULL
);
CREATE INDEX simulationsteps_simulationid ON simulationsteps(simulationid);
CREATE INDEX simulationsteps_step ON simulationsteps(step);
-- }}}
-- SimulationStepPersona {{{
-- NOTE: This represents how a given persona reacts according to the step in simulationsteps
DROP TABLE IF EXISTS simulationstepspersona;
CREATE TABLE simulationstepspersona(
	simulationid int,
	step int,
	personaid int,
	patternoffset int,
	cash float(20, 5),
	PRIMARY KEY (simulationid, step, personaid)
);
CREATE INDEX simulationstepspersona_sim_persona ON simulationstepspersona(simulationid, personaid);
CREATE INDEX simulationstepspersona_step ON simulationstepspersona(step);
-- }}}
