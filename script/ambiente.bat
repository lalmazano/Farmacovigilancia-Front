cd ..
:PROMPT
SET /P rama=Escriba nombre de rama origen: 
git checkout %rama% -- codigo/src/app/
git checkout %rama% -- codigo/src/assets/
git checkout %rama% -- codigo/src/custom-theme.scss
git checkout %rama% -- codigo/src/styles.css
git checkout %rama% -- codigo/angular.json
git checkout %rama% -- codigo/package.json
git checkout %rama% -- codigo/tsconfig.json
git checkout %rama% -- codigo/tsconfig.app.json
git checkout %rama% -- codigo/tsconfig.spec.json
git checkout %rama% -- codigo/.gitignore
git checkout %rama% -- .gitignore
git checkout %rama% -- conf/
git checkout %rama% -- script/
git checkout %rama% -- documentos/
git checkout %rama% -- Dockerfile
git checkout %rama% -- CertIGSS.pfx
git checkout %rama% -- produccion.key
git checkout %rama% -- star_igssgt_org.cer
git checkout %rama% -- star_igssgt_org.crt
git checkout %rama% -- README.md
git status
pause

setlocal
SET /P pregunta=¿Desea realizar el commit? (s/[N]) 
IF /I "%pregunta%" NEQ "s" goto end

git add .
SET /P mensaje=Mensaje para commit: 
git commit -m "%mensaje%"
git push
pause

:END
endlocal

