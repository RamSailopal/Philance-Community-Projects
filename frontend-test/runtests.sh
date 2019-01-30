#!/bin/bash
#
#	AUTHOR - Raman Sailopal
#
#	Script to run Selenium front end, Reactjs tests through nosetests 
#	for html reporting. 
#
export PATH=$PATH:/home
export DISPLAY=:1
if [[ "$1" == "" ]]
then
	echo "Running ALL tests ..."
	echo
	echo
	nosetests -v $(cat /opt/openproject/public/Philance/frontend-test/runningorder.txt) --with-html --html-report=/opt/openproject/public/Philance/frontend-test/test.html
else
	echo "Running tests for $1"
	echo
	echo
	nosetests /opt/openproject/public/Philance/frontend-test/$1 --with-html --html-report=/opt/openproject/public/Philance/frontend-test/test.html
fi
