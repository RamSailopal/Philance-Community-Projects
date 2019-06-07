#!/bin/bash
#
#	Script to restart the react server to the foreground"
#
pid=$(sudo ss -lnp | grep 3000 | awk -F[,=] '{ print $3 }')
if [[ "$pid" == "" ]]
then
	cd /opt/openproject/public/philance-app;npm start 	
else
        printf "\n\nKilling process %s.... \n\n" "$pid"
	kill -9 $pid
        printf "\n\nRestarting the react server\n\n"
	cd /opt/openproject/public/philance-app;npm start
fi
