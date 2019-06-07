Development in docker

Linux

Docker-compose will allow the build of the development infrastructure required.

Pre-requisites - Docker needs to be installed as well as docker-compose

Environmental variables - The following environmental variables will need to be exported:

hostaddy - The address of your docker host i.e. 192.168.240.5
repopath - The path of the repository i.e /opt/Philance
mediapath - The path that will store the attachments to projects, tasks and user profiles.

Three containers will be created, one for the frontend on port 3000, one for the backend on 3001 and one for mysql

Once the environmental variables have been created, issue the command "docker-compose up" from this directory

On completion of boot navigate to http://<hostaddy>:3000

Windows (not Windows 10)

If you wish to run Docker on Windows and don't have Windows 10, download Docker-toolbox from:

https://github.com/docker/toolbox/releases

Install the lastest version.

Once Docker-toolbox and all the necessary pre-requisites have been installed, Run Win-docker-start.bat in this folder
as administrator and this will boot-strap the process of creating a Virtual Box Docker machine on Linux and create
the necessary containers. The script will advise you of the address to navigate to in order to access the Philance platform.

To stop the containers, press ctrl and C in the console and then exit and Y to terminate the batch job.

The Virtual Box virtual machine will still run and the environment can be restarted at any time by simply following the same
process above, i.e. running Win-docker-start.bat

To remove the virtual machine, open the Virtual Box GUI as administrator, right click on the default machine and Close -> Power Off

Then right click again and remove -> delete all files associated with the machine