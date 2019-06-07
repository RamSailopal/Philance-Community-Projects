cd C:\Hashicorp\Philance
@echo off
echo Running server api test
vagrant ssh -c "sudo bash -c 'cd /opt/openproject/public/Philance/server-api;sudo npm test'"
echo Running front end Selenium test
vagrant ssh -c "sudo bash -c 'sudo /opt/openproject/public/Philance/frontend-test/runtests.sh login.py'"
pause