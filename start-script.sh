cd server
npm install
npm run build

cd ..
cd ui-ssr
npm install
npm run build

cd ..
cd server
npm start &

cd ..
cd ui-ssr
npm start
