cd C:\Hashicorp\Philance
vagrant ssh -c "cd /opt/openproject/public/philance-app && sudo node_modules/.bin/eslint . -o ../Philance/frontend-lintreport.html -f html;cd /opt/openproject/public/Philance/server-api && sudo node_modules/.bin/eslint . -o ../backend-lintreport.html -f html"
pause