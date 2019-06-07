ALTER TABLE `philance`.`projects` 
ADD COLUMN `default_image` LONGTEXT NULL DEFAULT NULL AFTER `last_updated_by`,
ADD COLUMN `project_summary` LONGTEXT NULL DEFAULT NULL AFTER `default_image`,
ADD COLUMN `project_challenge` LONGTEXT NULL DEFAULT NULL AFTER `project_summary`,
ADD COLUMN `project_solution` LONGTEXT NULL DEFAULT NULL AFTER `project_challenge`,
ADD COLUMN `project_justification` LONGTEXT NULL DEFAULT NULL AFTER `project_solution`;
