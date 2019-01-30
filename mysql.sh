#!/bin/bash
#
#	AUTHOR - Raman Sailopal
#
#	Automated script to allow remote access to local mysql instance and import the Philance database structure
#
if test -f /opt/openproject/public/Philance/mysql.sql
then
	mysql --user=root --password=$pass -h $mysqladd < /opt/openproject/public/Philance/mysql.sql
else
    mysql --user=root --password=$pass -h $mysqladd -e 'DROP DATABASE philance;'
	mysql --user=root --password=$pass -h $mysqladd < /opt/openproject/public/Philance/SQL_Tables.sql
	mysql --user=root --password=$pass -h $mysqladd < /opt/openproject/public/Philance/SQL_Insert.sql
	mysql --user=root --password=$pass -h $mysqladd -e "GRANT ALL PRIVILEGES ON philance.* TO 'philance'@'%' IDENTIFIED BY 'ph1ldb' WITH GRANT OPTION;"
	mysql --user=root --password=$pass -h $mysqladd -e "GRANT ALL PRIVILEGES ON philance.* TO 'philance'@'localhost' IDENTIFIED BY 'ph1ldb' WITH GRANT OPTION;"
fi
