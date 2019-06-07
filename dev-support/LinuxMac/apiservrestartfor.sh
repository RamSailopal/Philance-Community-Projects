#!/bin/bash
#
#	Script to restart the API server to the foreground with real time changes"
#
pid=$(sudo ss -lnp | grep 3001 | awk -F[,=] '{ print $3 }')
if [[ "$pid" == "" ]]
then
	cd /opt/openproject/public/Philance/server-api;node_modules/.bin/nodemon -L app.js 	
else
        printf "\n\nKilling process %s.... \n\n" "$pid"
	kill -9 $pid
        printf "\n\nRestarting the API server\n\n"
	cd /opt/openproject/public/Philance/server-api;node_modules/.bin/nodemon -L app.js
fi
