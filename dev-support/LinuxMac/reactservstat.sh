#!/bin/bash
#
#	Script to check if REACT server process is running within the VM
#
pid=$(sudo ss -lnp | grep 3000 | awk -F[,=] '{ print $3 }')
if [[ "$pid" != "" ]]
then
	printf "\n\nThe React server is running on port 3000 under process id %s\n\n" "$pid"
else
	printf "\n\nThe React server is NOT running at present\n\n"
fi
