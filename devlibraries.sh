#!/bin/bash
#
#	AUTHOR - Raman Sailopal
#
#	Libraries to install on startup
#
#	It is vital that this is kept up to date as the same script will run on 
#   the test server each time a build is initiated.
#
#	If any libraries are built on machines please update this file also
#
#
# The root directory for the reactjs directory on the Linux server is /opt/openproject/public/philance-app
#
# The root directory was already built with the base react libraries as part of the image hosted on Hasicorp
# We therefore need to first remove this
# 
sudo rm -Rf /opt/openproject/public/philance-app
#
# Recreate the directory ready for react material kit deployment
#
sudo mkdir /opt/openproject/public/philance-app
#
# Move to directory, pull the yarn repo and then install yarn and unzip
#
cd /opt/openproject/public/philance-app
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum install -y yarn
sudo yum install -y unzip
#
# Unzip the zipped material react zip file from the repo
#
sudo unzip /opt/openproject/public/Philance/material-dashboard-pro-react-v1.5.0.zip
#
# Remove the unzipped package.json file ready for symbolic link
#
# Create symbolic links from the repo files to the react root directory on the Linux VM
#
sudo rm /opt/openproject/public/philance-app/package.json
sudo rm /opt/openproject/public/philance-app/.env
sudo ln -s /opt/openproject/public/Philance/my-app/.eslintrc /opt/openproject/public/philance-app/
sudo ln -s /opt/openproject/public/Philance/my-app/package.json /opt/openproject/public/philance-app/
sudo ln -s /opt/openproject/public/Philance/my-app/.env /opt/openproject/public/philance-app/
#
# Install the additional libraries
#
sudo npm install express --save
cd /tmp;wget https://dev.mysql.com/get/Downloads/Connector-Nodejs/mysql-connector-nodejs-8.0.11.tar.gz
cd /opt/openproject/public/philance-app
sudo npm install /tmp/mysql-connector-nodejs-8.0.11.tar.gz
sudo npm install --save-dev eslint
sudo npm install --save-dev eslint-config-airbnb
sudo npm install --save-dev eslint-plugin-import
sudo npm install --save-dev eslint-plugin-jsx-a11y
sudo npm install --save-dev eslint-plugin-react
sudo npm install --save-dev babel-eslint
sudo npm install --save-dev pre-commit
#
# Install the React application with the material react kit
#
sudo yarn install --force
#
# Install the back-end api server
#
cd /opt/openproject/public/Philance/server-api
sudo yarn install --force

