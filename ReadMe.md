GEF REACT POC
===
Purpouse of this document is to provide insight into VIEW layer of an application if the view is based on technologies:

- Facebook React
- Facebook Flux
- Webpack (as Common js module bundlerer)
- Spring MVC (Spring Boot is used for prototyping)
- Maven

Before you start
---
Before you start you need to install latest version of [Node.js](www.nodejs.org/downloads) server. This is java project, so download all necessities for running Java applications (eclipse, maven, JDK, ...). Then run command below to download webpack as global package, and make it runnable on your `PATH`.

    npm install webpack -g

Setup application
---
Download project from repository and import it into your favourite IDE. You should see this structure (and maybe some IDE specific files)

<pre>
└──reactGEFpoc
   ├──src
   ├──.gitignore
   ├──package.json
   ├──pom.xml
   ├──readMe.md
   └──webpack.config.js

</pre>
To initialize this project run command below from commandline in path of your project root

    C:\reactGEFpoc>npm i

This will download all neccessery Node.js dependencies for this project. Definitions are stored in `package.json` file. If everything goes ok, you should see new folder in your project called `node_modules` and no error in the terminal/console.