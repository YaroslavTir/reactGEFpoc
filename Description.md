Introduction
============
The sample application is a standard Web applications built on technologies listed in *ReadMe.md* file stored in this repository. Its purpose is to show possibilities of application view layer based on React.js view framework from Facebook. The actual prerequisites for starting applications are listed in the *ReadMe.md* file, sothis paper will discuss only the functions and principles of the application itself.
Since the prototype is using Spring Boot, most configuration Core Spring, MVC, Data is hidden from developer, but the configuration is not the subject of this POC applications. The serverside validation is also not solved in this POC

Application part
================

Webpack
-------

This part of application is explicitly mentioned, because in terms of creating frontend application is the most important part. Webpack is like the Maven tasks for Javascript. It runs tasks according to the configuration file *webpack.config.js*. According to the configuration file, Webpack scans project Javascript files and forms/creates "distribution ready" list of css files and javascript files, too. You can add plugins to the configuration and save the result in specified folder. In the Webpack configuration is necessary to determine where to start looking for a JavaScript dependencies - some kind of input, top of the search tree. Configuration may contain one or many entrypoints. In this POC, a function is used to create entrypoints from the folder that is provided in cofiguration.

```javascript
entry: createEntryPoints('./src/main/webapp/WEB-INF/views'), // function that creates entrypoints object like index : '.../index.js' from files found in provided folder
```
Then a resulting distribution javascript and other resources are created for a given input according to required javascript modules. The application also uses Webpack CommonsChunkPlugin plugin that combines the same CSS and JS from "entrypoint" to a separate file.
As already mentioned above, Webpack packs JavaScript files into one (per entrypoint). It is also possible to define whether files with different extensions should be treated differently - with different loader . for example JSX files must be transformed into javascript.

```javascript
loaders: [ // each filetype can be processed using diferent file loader
    {test: /\.jsx$/, loader: 'jsx-loader'}, // convert JSX files into Js files
    {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')}, // extrats css files from require(..) directives
    {test: /\.((svg)|(woff)|(woff)|(ttf)|(eot))$/, loader: 'file-loader', query: {name: '[name]\.[ext]'}} // extracts fonts from css files and adds them to distribution folder
]
```

In this section of configuration also some CSS Preprocessor can be added, perhaps LESS or SASS. Just define the regexp which should be matched and loader which should be used. Webpack stores the processed files specified in the configuration element *output*, which determines the folder and file name convention.

```javascript
    filename: "[name] .js" // how to name files javascipt files
```
*[name]* is a reference to the entrypoint, and in the case CSS file the same name as the module but with the extension ".css"
It is good practice to have Webpack permanently watching the project directory with the command "*webpack --debug --watch*". It catches save of project files and regenerates distribution javascript content and resources from into the output folder from the configuration. There is also a maven task that runs Webpack automatically before build (see *ReadMe.md*).
WebPack configuration file also can be also run according to different profiles from commandline - for example, adding "*webpack --debug -watch --p*" *p* at the end. This parameter triggers plugin which uglify / minify and the resulting files are generated minified and uglified for production use.

Web layer
---------
For each page that displays, following files should be created:
-   @RequestMapping in some Controller for itself jsp page
-   @RequestMapping at some Controller for delivery json model for the page
-   Create JSX view in the folder /webapp/WEB-INF/views

Webpack creates an entrypoint javascript for each React view and saves it into *webapp/dist*. Page *view.jsp* then loads javascript and css files for it and also + commons bundles. For example *view.jsp* which is returned for url mapping "/" (*IndexController.java*) uses following data:

```java
    mav.addObject("viewName","list");
    mav.addObject("modelUrl","listModel");
```
jsp generated (replaced with placeholder *view.jsp* contains):
```html
    <link href="dist/commons.js.css" type="text/css" rel="stylesheet">
    <link href="dist/list.css" type="text/css" rel="stylesheet">
    <script src="listModel" type="text/javascript"></script>
    <script src="dist/commons.js" type="text/javascript"></script>
    <script src="dist/list.js" type="text/javascript"></script>
```
This ensures that when a user enters a page, it will be available with its own logic and styles. What is a page view, and where it has generated (target html element) is defined in each file in the folder .jsx views. JSX files in the folder views does not export *CommonJS* module but immediately call her to render the page DOM.

So for example *Partner.jsx* is defined at the end of the file that is to render the element app in html (JSP) page. In *Partner.jsx* itself is also dependent on *Layout.jsx* that defines common features of application views. React views in the application should contain a minimum logic. The logic should be encapsulated in the individual nested components which are also responsible for cooperating with application javascript Store and application javacript Model.

**Store** is responsible for keeping the current model of the application. The model should not be treated in any other way than through the Store.
**Model** acts as a "single source of truth" - what is the model that "goes" on a server. The application itself is also initialized according to the Model. Data models in POC are created for each page and passed through controller call, which serializes the required data into JSON and then "prints" them through the JSP page. The result then looks for example like snippet below:
```javascript
'use strict';
window.gef = window.gef === undefined? {}: Window.gef;
window.gef.model ={"data":{"id":1,"name":"adsgsdg","birthDate":1421330340000,"birthNr":"asgsdg"},"state":{"messages":[],"valid":false
```
**View** React are components that call Action on the Dispatcher and changes its internal state according to events to which they are registered. React components in POC are built in a way that they can also define css styles which they require. All the styles are properly packaged and added to the distribution bundle using Webpack.
**Dispatcher** resolves action from the View layer and passes it to the suitable Store. Application Dispatcher always has one, but according to the situation that can address various action Store.

Java
----

Business model of this application is quite simple. It's just CRUD applications on a single entity - *Partner.java*. There are also two supporting classes in the package model used to generate the *JavaScript* model.
View layer in terms of Java class files is represented by *IndexContoller.java*. All methods in this file are mapped to different application URLs, where some of them returns a "link" on the page itself, and some on the model for the page - see example:
```java
@RequestMapping ("/ListModel")
listModel public ModelAndView () throws JsonProcessingException {

@RequestMapping (value = {"/list", "/"})
public String list () {
```
When creating a model for the page/view it is required to provide some business object (in POC it is only *Partner.java* or Iterable *<Partner>*) that should be "wrapped" into the object Model.java and return to the site.Final object is packed and serialized using *Jackson Json* to string (on the functionality of the *PartnerService.java*). *Model.java* adds metadata for model validation status as a validation report, or anything else needed.

Running application
===================

JavaScript application is started by calling the action on the Dispatcher '*init*' method in *componentDidMount* file *Layout.jsx*. Each view in an application contains Layout component. This ensures that all children components are rendered, and can adjust their status if needed. For a given event in *ApplicationStore.js* (actually it is Dispatcher method (method - dispatcherIndex ...) init method gets triggered, which merges data from Local Storage to the data from the server.
Note: There is a need to create a better logic because data from the server can be rewritten from local storage, but it can be solved by some metadata model or otherwise. The POC is just a simple example.
The application has functionality
-   to create new partners, with light validation,
-   overview of partners, along with the opening of a partner to the editing/view form

Partner.jsx
-----------
This view is used to define new partners - contains a form. Each inputbox on the form is React component. For the needs of the framework, it is sufficient to add an id attribute of the estimated model id, and the component bounds to it - inputs stores data into Store when you change the value of the attribute model while being validated according to defined validation (*AppModelValidations.js*). For that functionality component calls for action Dispatcher. After completion of the validation, 'validation' event is emmited to all components which listen to that event. Each component which is set up to listen to validation event ask Store whether the model chanded and adjust its status according to it. The event is also registered by *ValidationAlert.jsx* placed in the Layout.jsx that shows validation violations.
When user press Submit button an action on the *Dispatcher -> actions assigned in Store - submitModel*. is performed. According to the model state either allows saving or not. If it've succeeded, user is redirected to designated url. If the sending fails, the model is stored in localStorage. When successful saving will be redirected, but it is already old *IndexController.java*.

List.jsx
----------
Page contains a table listing data. We can say that the logic components *Table.jsx* which is a rendering of the data is only cares about properly display the data according to the defined configuration. It defines headers and action + data to display. The rest of logic is in the table component itself, which is still stateless. Some state variables might be added to the component - such assorting column, or data that are currently displayed in the case of pagination, etc ...

Conclusion
==========
This is only a little POC so demonstration of the potential Framework React in conjunction with Java environment is only slight. This is not a fully functional application and principles used here just demonstrate possibilities of this particular frameworks combination.

Benefits of said access
-----------------------
-   webpack cares about cleaning unnecessary resources for the site - page has always just what is needed, nothing more.
-   React components can be encapsulate any other functionality provided by jQuery plugin or any other framework - see Datetimeselector.jsx that uses this approach.
-   CommonJS modules - suitable solution for managing javascript dependencies - Same approach for js dependence as for java (versioning libraries etc ..)
-   The ability to write and to view Mock model, since Build view independently of java layer using WebPack -Watch bags and is in the final web application running on IDE refilled at runtime.
-   Using Flux application architecture is only one-way flow of data - there is two-way databinding that for larger applications can cause problems with runaway.
-   Shadow of Dom ReAcT accelerates application running on the client side -is resource-conserving browser.

Disadvantages
-------------
-   View and logic  is written in JavaScript, and JSX, thus not immediately see what is on the page generates.