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
To start you need to clone this repository using (so [Git](http://git-scm.com/) is needed)

    git clone https://github.com/octopuss/reactGEFpoc.git

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

For running Java application please use command

    mvn clean exec:exec spring-boot:run

Web application should start on [http://localhost:8080](http://localhost:8080)


Application dependencies
---

-   [Git](http://git-scm.com/) - versioning system
-	[Node.js](http://nodejs.org/) - runtime for webpack + serverside packages
-   [Spring Boot](http://projects.spring.io/spring-boot/) - production-grade Spring based Application support
-   [webpack](http://webpack.github.io/) - clientside module bundler
-   [jQuery](http://jquery.com/) - just for ajax and plugins, do not use it for anything else ;)
-   [DateTimePicker](http://xdsoft.net/jqplugins/datetimepicker/) (need to be changed to work as CommonJs module see [jqueryPluginCommonjs](https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js))
-	[React](http://facebook.github.io/react/) - html rendering
-	[Flux](http://facebook.github.io/flux/docs/overview.html) - unidirectional data flow
-   [React-bootstrap](http://react-bootstrap.github.io/) - bootstrap components for react
-	[Bootstrap](http://getbootstrap.com/) - just some parts of css are used in application
-   [Moment.js](http://momentjs.com/) - javascript datetime manipulation
-   [Promises.js](https://www.promisejs.org/) - asynchronous callbacks wrapper


##For more information read [Description.md](https://github.com/octopuss/reactGEFpoc/blob/master/Description.md)