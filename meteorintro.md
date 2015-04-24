# Meteor: Theory and Practice

## Welcome and Demo

http://meteormemeintro.meteor.com

## Building an app
(Follow https://www.meteor.com/install).
* `curl https://install.meteor.com/ | sh`
    * Installs the `meteor` command line tool.
* `meteor create myproject`
    * Creates `myproject/` directory, and `.meteor/` subdirectory.
    * Creates `myproject.js`, `myproject.css`, `myproject.html` in `myproject/` directory.
* `meteor add accounts-ui accounts-password`
    * Adds basic accout management packages from [Atmosphere](https://atmospherejs.com).
* `meteor remove insecure` and `meteor remove autopublish`
    * Remove gaping security holes, offered for your convenience.
* `meteor`
    * Starts your app at `localhost:3000`.
* **Edit**. Changes to source files are hotpushed.
* `meteor deploy my_project_name.meteor.com`

# Key Meteor Concepts

## What I've Been Learning
* Templates [Meteor Docs: http://docs.meteor.com/#/full](http://docs.meteor.com/#/full)
* Data context [Sacha Greif article](https://www.discovermeteor.com/blog/a-guide-to-meteor-templates-data-contexts/)
* Meteor notions of state
* Meteor methods [Meteor Docs](http://docs.meteor.com/#/full)
* Pub / Sub [Meteor Docs](http://docs.meteor.com/#/full)
* Mongo [Meteor Docs](http://docs.meteor.com/#/full), [Mongo Docs](http://docs.mongodb.org/manual)
* Paths [Meteor Docs](http://docs.meteor.com/#/full)
* Packages [Atmosphere](https://atmospherejs.com)
    * Iron.router
* Tracker / Blaze / DDP / EJSON / BSON [Meteor Docs](http://docs.meteor.com/#/full)

## Templates
A **template** is a place where *markup*, *code*, and *data* come together.

* Markup
    * Lives in `html` files.
    * Has access to computed, reactive data.
* Code
    * Defined with `Template` methods.
        * Creation, rendered, events, destroyed and *helpers*.
            * Helpers let you use reactive magic
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

## State
* Session holds state for the current tab.
* The database holds state for the universe
    * Actual, server-side implementation
    * Simulated, client-side implementation (Mini-mongo)
* The current user is state that persists across tabs
* Code location
    * Can be client, server, or both

## TOO MANY WORDS: NEED MORE MEMES
https://twitter.com/MeteorMemes

## Meteor Methods
* Provide reactivity and simulation for free
* *Blaze* compiler creates both client-side and server-side code
* *Tracker* adds a reactive hook to all database calls.
* DDP websockets handle the communication

## Publications
* Single location to control data exposure to client
* Subscriptions control reactivity
* Users table is a little [magical](http://docs.meteor.com/#/full/meteor_users) (there are defaults)

## Mongo
* Popular NoSQL datastore
* Mongo hierarchy
* Database
    * Collection
        * Document
            * Field: Value
* Values are EJSON (Arrays, Dates, Nested Objects, etc.)
* Schema-less
    * (But your data probably has structure, so be careful)
* Rich query language, not SQL.

## Paths
* There are [magic](http://docs.meteor.com/#/full/structuringyourapp) directory names
    * `client`, `server`
    * `public`, `private`
    * `client/compatibility`
    * `tests`
    * `lib`
* After some rules, code is built in alpha order, with deepest layers first.

## Packages
    * The package repository is [Atmosphere](https://atmospherejs.com)
        * `meteor add <packagename>` and you're done
    * The most important package is [Iron.router](https://github.com/iron-meteor/iron-router)
        * Manage routing with URLs, basically required
    * Other packages for Bootstrap, React, many, many more
