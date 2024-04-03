
# Setup instructions

1. Add the `google-services.json` file in `adroid/app` directory
2. Install dependencies `npm i`
3. Connected to a physical device and run `npx expo start --tunnel` in the root directory

#### You might encounter an error that says
>Could not determine the dependencies of task ':app:compileDebugJavaWithJavac'.
> Could not determine the dependencies of null.
   > SDK location not found. Define a valid SDK location with an ANDROID_HOME environment variable or by setting the sdk.dir path in your project's local properties file at 'C:\Users\warfr\Downloads\projects\jng-expo\android\local.properties'.`
#### This can problem can be resolved: https://stackoverflow.com/questions/27620262/sdk-location-not-found-define-location-with-sdk-dir-in-the-local-properties-fil
