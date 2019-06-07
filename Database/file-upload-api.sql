ALTER TABLE `philance`.`projects` 
ADD COLUMN `budget_details` LONGTEXT NULL DEFAULT NULL AFTER `project_justification`,
ADD COLUMN `supplies_needed` LONGTEXT NULL DEFAULT NULL AFTER `budget_details`,
ADD COLUMN `city` LONGTEXT NULL DEFAULT NULL AFTER `supplies_needed`;
ALTER TABLE `philance`.`project_attachments` 
ADD COLUMN `attachment_type` VARCHAR(45) NULL DEFAULT NULL AFTER `last_updated_by`;
CREATE TABLE `philance`.`project_link_attachments` (
  `project_id` INT NOT NULL DEFAULT '0',
  `attachment_path` VARCHAR(720) NOT NULL,
  `attachment_details` VARCHAR(720) NULL DEFAULT '',
  `attachment_type` VARCHAR(45) NULL DEFAULT NULL,
  `creation_date` DATETIME NULL DEFAULT NULL,
  `created_by` INT(11) NULL DEFAULT NULL,
  `last_updated_date` DATETIME NULL DEFAULT NULL,
  `last_updated_by` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`project_id`, `attachment_path`));
CREATE TABLE `philance`.`project_updates` (
  `project_id` INT NOT NULL,
  `update_id` INT(11) NOT NULL AUTO_INCREMENT,
  `text` LONGTEXT NULL,
  `created_by` INT(11) NULL,
  `creation_date` DATETIME NULL,
  `last_updated_by` INT(11) NULL,
  `last_updated_date` VARCHAR(45) NULL,
  PRIMARY KEY (`update_id`));