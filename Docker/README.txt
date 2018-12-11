Development in docker

The docker-compose will allow the build of the development infrastructure required.

Pre-requisites - Docker needs to be installed as well as docker-compose

Environmental variables - The following environmental variables will need to be exported:

hostaddy - The address of your docker host i.e. 192.168.240.5
repopath - The path of the repository i.e /opt/Philance
mediapath - The path that will store the attachments to projects, tasks and user profiles.

Three containers will be created, one for the frontend on port 3000, one for the backend on 3001 and one for mysql

Once the environmental variables have been created, issue the command "docker-compose up" from this directory

On completion of boot navigate to http://<hostaddy>:3000