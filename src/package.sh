#!/bin/bash
cd ../
package_dir=chatwork-mute-room
zip_dir=chatwork-mute-room.zip

rm -r $package_dir
rm $zip_dir
mkdir $package_dir
cp src/manifest.json $package_dir
cp src/popup.html $package_dir
cp -r src/build $package_dir
zip -r $zip_dir $package_dir
