ALTER TABLE `philance`.`project_link_attachments` 
ADD COLUMN `id` INT(11) NOT NULL AFTER `last_updated_by`,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`attachment_path`, `project_id`, `id`);
;
ALTER TABLE `philance`.`project_link_attachments` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`, `project_id`, `attachment_path`);
;
ALTER TABLE `philance`.`project_link_attachments` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT ;


ALTER TABLE `philance`.`project_attachments` 
ADD COLUMN `id` INT(11) NOT NULL AFTER `attachment_type`,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`project_id`, `name`, `id`);
;

ALTER TABLE `philance`.`project_attachments` 
DROP FOREIGN KEY `project_attachments_ibfk_1`;

ALTER TABLE `philance`.`project_attachments` 
CHANGE COLUMN `id` `id` INT(11) NOT NULL AUTO_INCREMENT FIRST,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`id`, `project_id`, `name`);
;

ALTER TABLE `philance`.`project_attachments` 
ADD INDEX `project_attachments_ibfk_1_idx` (`project_id` ASC);
;
ALTER TABLE `philance`.`project_attachments` 
ADD CONSTRAINT `project_attachments_ibfk_1`
  FOREIGN KEY (`project_id`)
  REFERENCES `philance`.`projects` (`project_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
