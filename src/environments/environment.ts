// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyA0qvbVS8i8IdbzFpPQSrQEZSPXLdY9t7I",
    authDomain: "firetrix-project-mendiola.firebaseapp.com",
    databaseURL: "https://firetrix-project-mendiola.firebaseio.com",
    projectId: "firetrix-project-mendiola",
    storageBucket: "firetrix-project-mendiola.appspot.com",
    messagingSenderId: "31127316738"
  },
  apiUrl: "https://us-central1-firetrix-project-mendiola.cloudfunctions.net"  
};
