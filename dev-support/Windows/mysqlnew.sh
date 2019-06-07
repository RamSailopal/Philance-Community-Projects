#!/bin/bash
#
#	AUTHOR - Raman Sailopal
#
#	Script to clear out the Philance database and re provision
#
sudo rm -f /opt/openproject/public/Philance/mysql.sql
sudo bash -c 'export pass=ph1ldb;/opt/openproject/public/Philance/mysql.sh'
printf "\n\n\n%s\n\n\n" "The Philance database has been cleared and provisioned from scratch" 

