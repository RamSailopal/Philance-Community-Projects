#!/bin/bash
#
#	Script to check if API server process is running within the VM
#
pid=$(sudo ss -lnp | grep 3001 | awk -F[,=] '{ print $3 }')
if [[ "$pid" != "" ]]
then
	printf "\n\nThe API server is running on port 3001 under process id %s\n\n" "$pid"
else
	printf "\n\nThe API server is NOT running at present\n\n"
fi
