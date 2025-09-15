cd ..\cicd\
rmdir /s /q dist
cd ..\script\
Xcopy /E /S ..\codigo\dist\ ..\cicd\dist\
pause
