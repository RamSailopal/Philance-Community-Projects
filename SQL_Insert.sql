-- insert table script
/*-- job application status-------*/
insert into philance.philance_lookups	
values('PROJECT', 'APPLICANT_STATUS', 'APPLIED', 'Applicant applied for a project', CURTIME(), 0, CURTIME(),0);

insert into philance.philance_lookups	
values('PROJECT', 'APPLICANT_STATUS', 'IN REVIEW', 'Applicant being reviewed for a project', CURTIME(), 0, CURTIME(),0);

insert into philance.philance_lookups	
values('PROJECT', 'APPLICANT_STATUS', 'APPROVED', 'Applicant approved for a project', CURTIME(), 0, CURTIME(),0);

insert into philance.philance_lookups	
values('PROJECT', 'APPLICANT_STATUS', 'REJECTED', 'Applicant rejected for a project', CURTIME(), 0, CURTIME(),0);

/* Impact Categories*/ 
insert into philance.philance_lookups
values ('IMPACT_CATEGORIES', 'COMMUNITY', 'Community', 'Community Service', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('IMPACT_CATEGORIES', 'ELDERLY', 'Elderly', 'Elderly Service', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('IMPACT_CATEGORIES', 'HOMELESS', 'Homeless', 'Homeles Service', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('IMPACT_CATEGORIES', 'OTHER', 'Other', 'Other Service', curtime(), 0, curtime(), 0);

/*User Types*/
insert into philance.philance_lookups
values ('USER_TYPES', 'PROJECT', 'Project Owner', 'Person who creates a project', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('USER_TYPES', 'PROJECT', 'Project Sponsor', 'Person who funds a project', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('USER_TYPES', 'PROJECT', 'Project Member', 'All freelancers who support fulfill a project', curtime(), 0, curtime(), 0);

/*Project Roles*/
insert into philance.philance_lookups
values ('PROJECT_ROLES', 'PROJECT', 'Developer', 'Developer', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('PROJECT_ROLES', 'PROJECT', 'Manager', 'Project Manager', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('PROJECT_ROLES', 'PROJECT', 'Tester', 'Tester', curtime(), 0, curtime(), 0);

/* Skills Lookup*/
insert into philance.philance_lookups
values ('SKILLS', 'IT', 'Database Development', 'Database Development', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('SKILLS', 'IT', 'JAVA Development', 'JAVA Development', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('SKILLS', 'BUSINESS', 'Project Management', 'Project Development', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('SKILLS', 'OTHER', 'Other', 'Other', curtime(), 0, curtime(), 0);

/* Possible notificaiton that user can set */
insert into philance.philance_lookups
values ('NOTIFICATION', 'TRIGGER', 'Message', 'When another Philance members messages a user', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('NOTIFICATION', 'TRIGGER', 'Project Application Status', 'When a project application is approved/rejected', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('NOTIFICATION', 'TRIGGER', 'Project Updates', 'When a updates are available on project', curtime(), 0, curtime(), 0);

-- insert into philance.users
-- values (100, 'Ram', 'Sailopal', 'rsailopal@gmail.com', '$2b$10$lkezHqJk/Y5zup4gEEEXYeMfEBL0zVnRTrDFpNGZvVeZlERLtCtZi', null, null, null, null, null, null, null, null, null, null, null, null, 'Birmingham');

insert into philance.philance_lookups
values ('INTERESTS', 'AnimalWelfare', 'Animal Welfare', 'Care for the Animals', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'ChildWelfare', 'Child Welfare', 'Care and support for the Children', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'CommunityDevelopment', 'Community Development', 'Care for the Community', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'DisasterRelief', 'Disaster Relief', 'Relief and support at disasted affected areas', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'DiversityInclusion', 'Diversity & Inclusion', 'Awareness for the Diversity', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'Education', 'Education', 'Support for the education', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'ElderlyWelfare', 'Elderly Welfare', 'Care and support for the Senior Citizens', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'Employment', 'Employment', 'Initiatives to support Employment', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'FoodNutrition', 'Food and Nutrition', 'Initiatives to curb Hunger and Malnutrition', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'Health', 'Health and Disease Outbreak Support', 'Care for the health', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'Homelessness', 'Housing and Homelessness', 'Curb Homelessness', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'HumanRights', 'Human Rights', 'Care for the Human Rights', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'Justice', 'Justice and Legal Rights', 'Helps to support Justics and Legal rights', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'Philanthropy', 'Philanthropy', 'Philanthropy', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'ViolencePrevention', 'Violence Prevention', 'Prevents Voilence', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'WomensWelfare', 'Womens Welfare', 'Care for the Animals', curtime(), 0, curtime(), 0);

insert into philance.philance_lookups
values ('INTERESTS', 'YouthWelfare', 'Youth Welfare', 'Care for the Youth', curtime(), 0, curtime(), 0);


commit;
