#!/bin/bash
docker exec -dt $(docker ps | awk '/philance-frontend/ { print $1 }') bash -c "cd /opt/openproject/public/philance-app && node_modules/.bin/eslint . -o ../Philance/frontend-lintreport.html -f html"
docker exec -dt $(docker ps | awk '/philance-api/ { print $1 }') bash -c "cd /opt/openproject/public/Philance/server-api && node_modules/.bin/eslint . -o ../backend-lintreport.html -f html"