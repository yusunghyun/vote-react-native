# osascript -e 'quit app "XCode"'
# osascript -e 'quit app "Android Studio.app"'
echo '*****************************************'
echo 'Remove node_modules folder'
echo '*****************************************'
# rm -rf ./node_modules
rm -rf ./node_modules yarn.lock
yarn cache clean
echo '*****************************************'
echo 'Yarn install'
echo '*****************************************'
yarn install
npm i 
echo '*****************************************'
echo 'iOS Clean Start'
echo '*****************************************'
rm -rf ./ios/Podfile.lock
rm -rf ./ios/Pods
rm -rf ./ios/*.xcworkspace
npx pod-install
echo '*****************************************'
echo 'Android Clean Start'
echo '*****************************************'

N=$PWD
cd ~
cd Library/Android/sdk
A="sdk.dir="
A+=$PWD
cd $N
echo $A > ./android/local.properties

rm -rf ./android/.idea
rm -rf ./android/build
rm -rf ./android/.gradle
cd ./android && ./gradlew clean && cd ..
open ./ios/*.xcworkspace
open -a /Applications/Android\ Studio.app ./android/
echo 'Finished'
