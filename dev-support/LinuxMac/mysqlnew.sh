#!/bin/bash
#
#	AUTHOR - Raman Sailopal
#
#	Script to clear out the Philance database and re provision
#
sudo mysql --user=philance --password=ph1ldb -e "DROP DATABASE philance" philance;
sudo rm -f /opt/openproject/public/Philance/mysql.sql
sudo /opt/openproject/public/Philance/mysql.sh
printf "\n\n\n%s\n\n\n" "The Philance database has been cleared and provisioned from scratch" 

