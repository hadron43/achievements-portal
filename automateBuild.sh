npm run build
mkdir build-dep
rm -r build-dep/*
cp -r build/* build-dep/
cd build-dep
git add .
git commit -m "update"
git push
cd ..
