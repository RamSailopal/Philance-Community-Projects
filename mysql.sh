#!/bin/bash
#
#       AUTHOR - Raman Sailopal
#
#       Automated script to allow remote access to local mysql instance and import the Philance database structure
#
mysqladd="localhost"
test -f /etc/openproject/installer.dat
if [[ "$?" == 1 ]]
then
        pass="ph1ldb"
        mysqladd="mysql"
else
        pass=$(awk '/root_password/ { print $2 }' /etc/openproject/installer.dat)
fi
test -f /opt/openproject/public/Philance/mysql.sql
if [[ "$?" == "0" ]]
then
        mysql --user=root --password=$pass -h $mysqladd < /opt/openproject/public/Philance/mysql.sql
else
		cd /opt/openproject/public/Philance/Database
		mysql --user=root --password=$pass -h $mysqladd -e 'DROP DATABASE philance;'
        cat /opt/openproject/public/Philance/Database/index.txt | while read line
        do
                mysql --user=root --password=$pass -h $mysqladd < "$line"
        done
        mysql --user=root --password=$pass -h $mysqladd -e "GRANT ALL PRIVILEGES ON philance.* TO 'philance'@'%' IDENTIFIED BY 'ph1ldb' WITH GRANT OPTION;"
        mysql --user=root --password=$pass -h $mysqladd -e "GRANT ALL PRIVILEGES ON philance.* TO 'philance'@'localhost' IDENTIFIED BY 'ph1ldb' WITH GRANT OPTION;"
fi