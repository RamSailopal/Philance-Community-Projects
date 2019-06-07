#!/bin/bash
#
#	AUTHOR - Raman Sailopal
#
#	Automated script to dump developer mysql databases 
#
pass=$(awk '/root_password/ { print $2 }' /etc/openproject/installer.dat)
mysqldump --all-databases --user=root --password=$pass > /opt/openproject/public/Philance/mysql1.sql
