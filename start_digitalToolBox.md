# checklist for environment#
---------------------------
PS C:\Users\gupta\Documents\DailyToolbox> node --version
v20.19.2
PS C:\Users\gupta\Documents\DailyToolbox> npm --version
10.8.2

# run backend Server #
PS C:\Users\gupta\Documents\DailyToolbox> cd .\backend\
PS C:\Users\gupta\Documents\DailyToolbox\backend> npm start

# run frontend Server #
PS C:\Users\gupta\Documents\DailyToolbox> cd .\frontend\
PS C:\Users\gupta\Documents\DailyToolbox\frontend> npm start

# git REPO #
# git hub Repo:  https://github.com/buzztheglobal/DTBox.git
# #
-------------------
##Create a Virtual Environment#
# Navigate to the backend directory
PS C:\Users\gupta\Documents\DailyToolbox> cd backend

#
Username (leave blank to use 'gupta'): vgupta
Email address: buzz.theglobal@gmail.com
Password: MG#Jun!25
Password (again):MG#Jun!25
#

# run front Server #
# #open New Terminal #
PS C:\Users\gupta\Documents\DailyToolbox> cd .\frontend\

PS C:\Users\gupta\Documents\DailyToolbox\frontend> npm run dev

http://localhost:5173/

# git commands # https://github.com/buzztheglobal/DTBox.git
git add .
git commit -m "password-generator"
git push origin main

git remote add origin https://github.com/buzztheglobal/DTBox

Phase 1: https://g.co/gemini/share/aa37a0914942

npm install react@18.2.0 react-dom@18.2.0
npm install @mui/material@5.15.19 @mui/icons-material@5.15.18
npm install @emotion/react@11.11.4 @emotion/styled@11.11.5
npm install bootstrap@5.3.3 firebase@10.12.4
npm install react-scripts@5.0.1

Remove-Item -Recurse -Force .\node_modules\
Remove-Item -Force .\package-lock.json

npm cache clean --force
npm ls react
npm install chart.js react-chartjs-2 