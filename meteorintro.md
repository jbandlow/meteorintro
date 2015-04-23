% Introduction to Meteor
% Jason Bandlow
% April 23, 2015

# Meteor: Theory and Practice

## Welcome and Demo

## Building an app
(Follow https://www.meteor.com/install).
* `curl https://install.meteor.com/ | sh`
    * Installs the `meteor` command line tool.
* `meteor create myproject`
    * Creates `myproject/` directory, and `.meteor/` subdirectory.
    * Creates `myproject.js`, `myproject.css`, `myproject.html` in `myproject/` directory.
* `meteor add accounts-ui accounts-password`
    * Adds these packages from [Atmosphere](https://atmospherejs.com).
* `meteor remove insecure` and `meteor remove autopublish`
    * Remove gaping security holes, offered for your convenience.
* `meteor`
    * Starts your app at `localhost:3000`.
* Edit. Changes to source files are hotpushed.
* `meteor deploy my_project_name.meteor.com`

# Key Meteor Concepts

## What I've Been Learning
* Templates
* Data context
* Meteor methods
* Mongo
* Pub / Sub
* Meteor notions of state
* Paths
* Handlebars
* Packages
    * Iron.router
* Tracker / Blaze / DDP / EJSON / BSON

## Templates
A **template** is a place where *markup*, *code*, and *data* come together.

* Markup
    * Lives in `html` and `css` files.
    * Has access to computed, reactive data.
* Code
    * Defined with `Template` methods.
        * Creation, rendered, events, destroyed and *helpers*.
        * Has access to data context
        * Context may differ from instance to instance
<!-- Show in demo -->

## Data Context
* What context does a template have?
    * Inside `{{#with}}` or `{{#each}}`, the item
    * `{{> foo}}`: Calling context passed on
    * `{{> foo bar}}`: Context is set to bar
    * `{{foo a=1 b=2}}`: Context is passed with these props set.
* When in doubt, look it up
    * `console.log(this)`

## Managing State
* Session vs DB vs User
* Client vs Server vs Shared



##  What is Meteor
A framework that's
* Reactive
* Full stack
* With a package-management system
* and lots of convenience code


## History Lesson

### <DEC Terminal> Yes I'm as dumb as I look.
* Make a request, get a response

### Peer-2-Peer <Napster>
* Let's have a conversation

### HTTP:
* Request / response again: GET / POST / ...

### Websockets
* 2011.  We can have a conversation.
* 2011: Meteor




## What is Meteor
* Javascript framework for a conversation with the server

## What other choices are there?
* Full-stack solutions
* Reactive solutions
* Package management solutions


## Why Meteor


