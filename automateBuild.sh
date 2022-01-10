npm run build
cd build-dep
rm -r *
cd ..
cp -r build/* build-dep/
cd build-dep
git commti -a -m "update"
git push
cd ..

