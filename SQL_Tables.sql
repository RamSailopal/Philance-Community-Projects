/*drop database philance;*/
Create database philance;


/*This table stores refences to all supported values for various functions- project types, impact categories, roles, skills, status etc
This is the only lookups table for now*/
/*drop table philance.philance_lookups;*/
CREATE TABLE philance.philance_lookups (
    lookup_type VARCHAR(100),
    lookup_code VARCHAR(100),
    meaning VARCHAR(100),
    description VARCHAR(1000),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    PRIMARY KEY (lookup_type , lookup_code , meaning)
);

/*This table stores details of user when they sign up and when profiles are updated*/
/*drop table philance.users;*/
CREATE TABLE philance.users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(100),
    lname VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(1000),
    ph_number VARCHAR(20),
    organization VARCHAR(200),
    title VARCHAR(200),
    rate DECIMAL(5 , 2 ),
    auth_src VARCHAR(100),
    last_login DATETIME,
    status VARCHAR(50),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    interests VARCHAR(3072),
    location VARCHAR(3072),
    zip_code varchar(30),
    country VARCHAR(3072),
    description VARCHAR(3072),
    user_profile_image_path VARCHAR(3072),
    user_profile_image_url VARCHAR(3072),
    INDEX usr_fname_ix (fname),
    INDEX usr_lname_ix (lname),
    INDEX usr_interests_ix (interests)
);

/*This table links to users and stores all user skills*/
/*drop table philance.user_skills;*/
CREATE TABLE philance.user_skills (
    user_id INT,
    skill_code VARCHAR(300),
    skill_name VARCHAR(300),
    certified VARCHAR(3) DEFAULT 'NO',
    certification_link LONGTEXT,
    start_date DATETIME,
    end_date DATETIME,
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    FOREIGN KEY (user_id)
        REFERENCES philance.users (user_id),
    PRIMARY KEY (user_id , skill_name)
);

/*This table stores user notifications settings and preferences */
/*drop table philance.user_notifications;    */
CREATE TABLE philance.user_notifications (
    user_id INT,
    notification_trigger VARCHAR(200),
    email VARCHAR(10),
    text varchar(10),
    push varchar(10),
    message varchar(100),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    FOREIGN KEY (user_id)
        REFERENCES philance.users (user_id),
    FOREIGN KEY (created_by)
        REFERENCES philance.users (user_id)
);


/*This table stores project information*/
/*drop table philance.projects;*/
CREATE TABLE philance.projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(500),
    description LONGTEXT,
    volunteers NUMERIC,
    freelancers NUMERIC,
    location VARCHAR(3072),
    start_date DATETIME,
    end_date DATETIME,
    zip_code varchar(30),
    country VARCHAR(3072),
    estimated_budget DECIMAL(10 , 2 ),
    status varchar(30),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    INDEX proj_project_name_ix (Project_name)
);

/*All skills, impact categories any other lists supported on create projects page will be stored in this table*/
/*drop table philance.project_needs; */
CREATE TABLE philance.project_details (
    project_id INT,
    detail_type VARCHAR(50),
    name VARCHAR(100),
    certification_reqd varchar(100),
    certification_link varchar(1000),
    attribute1 varchar(1000),
    attribute2 varchar(1000),
    attribute3 varchar(1000),
    attribute4 varchar(1000),
    attribute5 varchar(1000),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    PRIMARY KEY (project_id , detail_type , name),
    FOREIGN KEY (project_id)
        REFERENCES philance.projects (project_id)
);

/*Stores any attachments that are added to a project*/
/*drop table philance.project_attachments;*/
CREATE TABLE philance.project_attachments (
    project_id INT,
    name VARCHAR(500),
    original_name VARCHAR(500),
    attachment VARCHAR(3072),
    attachment_path VARCHAR(3072),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    PRIMARY KEY (project_id , name),
    FOREIGN KEY (project_id)
        REFERENCES philance.projects (project_id),
    INDEX projatch_name_ix (name)
);

/*This table stores list of tasks created for a project*/
CREATE TABLE philance.project_tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT ,
    task_name VARCHAR(500),
    description VARCHAR(3072),
    assigned_to INT,
    assigned_by INT,
    status VARCHAR(50),
    priority VARCHAR(50),
    start_date DATETIME,
    end_date DATETIME,
    target_hours DECIMAL(5 , 2 ),
    actual_hours DECIMAL(5 , 2 ),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    -- PRIMARY KEY (task_id),
    FOREIGN KEY (project_id)
        REFERENCES philance.projects (project_id),
    FOREIGN KEY (assigned_to)
        REFERENCES philance.users (user_id),
    FOREIGN KEY (assigned_by)
        REFERENCES philance.users (user_id),
    INDEX projtask_task_name_ix (task_name)
);

/*Stores any attachments that are added to a task*/

CREATE TABLE philance.task_attachments (
    task_id INT,
    project_id INT,
    name VARCHAR(500),
    original_name VARCHAR(500),
    attachment VARCHAR(3072),
    attachment_path VARCHAR(3072),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    PRIMARY KEY (task_id , name),
    FOREIGN KEY (project_id,task_id)
        REFERENCES philance.project_tasks (project_id,task_id),
    INDEX taskatch_name_ix (name)
);


/*all comments and discussions for task will be stored in this table*/
CREATE TABLE philance.project_task_updates (
    project_id INT,
    task_id INT,
    Update_id int,
    commented_by INT,
    commment LONGTEXT,
    attachment BLOB,
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    PRIMARY KEY (project_id , task_id, update_id),
    FOREIGN KEY (project_id , task_id)
        REFERENCES philance.project_tasks (project_id , task_id)
);

/*all applicants and selected members will be stored in this table- get data from philance lookups for roles-- also includes applicants details */
CREATE TABLE philance.project_team (
    project_id INT,
    user_id INT,
    role VARCHAR(200),
    type VARCHAR(200),
    start_date DATETIME,
    end_date DATETIME,
    applicant_message LONGTEXT,
    status VARCHAR(100),
	applied_date datetime,
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    PRIMARY KEY(project_id,user_id),
    FOREIGN KEY (project_id)
        REFERENCES philance.projects (project_id),
    FOREIGN KEY (user_id)
        REFERENCES philance.users (user_id)
);

CREATE TABLE philance.authentication (
    auth_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    auth_token VARCHAR(3072),
    refresh_token VARCHAR(3072),
    platform VARCHAR(100),
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT
);
CREATE TABLE philance.user_settings (
    id INT AUTO_INCREMENT,
    user_id INT,
    email_notifications VARCHAR(10) DEFAULT 'NO',
    text_notifications VARCHAR(10) DEFAULT 'NO',
    push_notifications VARCHAR(10) DEFAULT 'NO',
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
        PRIMARY KEY (id , user_id)
);
/* This table stores all communications and messages between philance users*/
/*drop table philance.messages;*/
CREATE TABLE philance.messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    body LONGTEXT,
    status VARCHAR(10) NOT NULL DEFAULT 'DRAFT',
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    FOREIGN KEY (created_by)
        REFERENCES philance.users (user_id)
);
/* This table represents group and it's details*/
/*drop table philance.messages;*/
CREATE TABLE philance.group (
    group_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(3072),
    project_id INT,
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    FOREIGN KEY (project_id)
        REFERENCES philance.projects (project_id)
);
/* This table represents users of a particular group*/
/*drop table philance.messages;*/
CREATE TABLE philance.user_group (
    user_group_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    group_id INT,
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    FOREIGN KEY (user_id)
        REFERENCES philance.users (user_id),
    FOREIGN KEY (group_id)
        REFERENCES philance.group (group_id)
);

/* This table stores all recipients of the messages*/
/*drop table philance.messages;*/
CREATE TABLE philance.message_recipient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipient_id INT,
    recipient_group_id INT,
    message_id INT,
    creation_date DATETIME,
    created_by INT,
    last_updated_date DATETIME,
    last_updated_by INT,
    FOREIGN KEY (created_by)
        REFERENCES philance.users (user_id),
    FOREIGN KEY (recipient_id)
        REFERENCES philance.users (user_id),
    FOREIGN KEY (recipient_group_id)
        REFERENCES philance.group (group_id)
    
);

