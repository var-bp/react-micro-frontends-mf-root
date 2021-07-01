# React Template
This TypeScript based template is designed to get you up and running with a bunch of awesome front-end technologies.

The primary goal of this project is to provide a stable foundation upon which to build modern web applications. Its purpose is not to dictate your project structure or to demonstrate a complete real-world application, but to provide a set of tools intended to make front-end development robust, easy, and, most importantly, fun.

## Micro Frontends
Good frontend development is hard. Scaling frontend development so that many teams can work simultaneously on a large and complex product is even harder. In [this](https://medium.com/swlh/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669) article we'll describe a recent trend of breaking up frontend monoliths into many smaller, more manageable pieces, and how this architecture can increase the effectiveness and efficiency of teams working on frontend code. As well as talking about the various benefits and costs, we'll cover some of the implementation options that are available, and we'll dive deep into a full example application that demonstrates the technique.

## Features
- support for `.css` & `.js` files
- TypeScript
- Normalize.css
- styled-components
- browserslist
- ESLint
- Prettier
- Babel
- webpack 5
  - code splitting (css & js)
  - tree shaking
  - terser
  - zopfli/brotli/gzip
  - module Federation
- Jest & React Testing Library
- optional libraries
  - styled-media-query
  - polished
  - eventemitter3

## Important notes
The weak point of this architecture is the `remotes` that are served over the http/https protocol. If the `remote` is unavailable your application will break. Therefore, carefully withstand `remotes` and provide fallbacks.

Adhere to [10 npm Security Best Practices](https://snyk.io/blog/ten-npm-security-best-practices/).

All your npm packages from `dependencies` must be the same version across all you react-micro-frontends repositories.

Communication of the react-micro-frontends-mf-root -> react-micro-frontends-mf-repository-1/react-micro-frontends-mf-repository-2 level is carried out through the `useEventEmitter` hook.

Communication of the react-micro-frontends-mf-repository-1 -> react-micro-frontends-mf-repository-2 level is carried out through the RESTful API.

react-micro-frontends-mf-ui-lib is a shared resources library.

Try to avoid or reduce bi-directional hosts (a webpack build that is both a host consuming remotes and a remote being consumed by other hosts). The more independent your application is, the better.

For a better understanding of the material please see this [course of lectures](https://www.youtube.com/playlist?list=PLNqp92_EXZBLr7p7hn6IYa1YPNs4yJ1t1) and [official documentation](https://webpack.js.org/concepts/module-federation/).

Transpiling to ES5 is not really a good idea these days. Around [95% of browsers support ES2017](https://caniuse.com/async-functions,object-values,object-entries,mdn-javascript_builtins_object_getownpropertydescriptors,pad-start-end,mdn-javascript_grammar_trailing_commas_trailing_commas_in_functions) features, So transpiling to ES2017 should reduce bundle size by 10-15%. If there is need to support older browsers(like IE11) there could be two build one with ES5 and one with 2017. Because of 3% of users 97% of user experience should not be compromised.

## How to share redux store in micro frontend architecture
If you are using redux, the usual approach is to have a single, global, shared store for the entire application. However, if each micro-frontend is supposed to be its own self-contained application, then it makes sense for each one to have its own redux store. The redux docs even mention "isolating a Redux app as a component in a bigger application" as a valid reason to have multiple stores.

Long story short: Don't share your redux store

Sharing anything between your micro frontends no longer makes them separate entities and defeats the entire purpose of it. Now it's just an overengineered monolith. Just turn those respective repos into well-defined modules inside a monolith repo. It is still possible to split responsibilities into their own silos in a unified repo. It just takes more discipline.

Problems of a single shared state:
- Accidental override of state of other apps (in case duplicate actions are dispatched by multiple apps)
- Apps would have to be aware of other Micro Frontends
- Shared middlewares. Since only a single store is maintained, all the Micro Frontends would have to share the same middlewares. So in situations where one app wants to use redux-saga and other wants to use redux-thunk is not possible.

## Installation
Create `.env` file on the root of the project.
```
MICROFRONTEND_HOST_NAME=root
MICROFRONTEND_HOST_URL=http://localhost:3000
MICROFRONTEND_HOST_PORT=3000

MICROFRONTEND_REMOTE_1_NAME=repository_1
MICROFRONTEND_REMOTE_1_URL=http://localhost:3001/js/remoteEntry.js
MICROFRONTEND_REMOTE_2_NAME=repository_2
MICROFRONTEND_REMOTE_2_URL=http://localhost:3002/js/remoteEntry.js
MICROFRONTEND_REMOTE_3_NAME=ui_library
MICROFRONTEND_REMOTE_3_URL=http://localhost:3003/js/remoteEntry.js
```

Install the project dependencies.
```bash
$ npm i
```

We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) and [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en). Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn't require installing any packages in your project.

## Running the Project
After completing the [installation](#installation) step, you're ready to start the project!

```bash
$ npm run start  # Start the development server
```

While developing, you will probably rely mostly on `npm run start` however, there are additional scripts at your disposal:

|`npm run <script>` |Description|
|-------------------|-----------|
|`build`            |Build prod app to ./build|
|`lint:js`          |Lint the project for potential errors|
|`lint:js:fix`       |Lint the project and fixes all correctable errors|
|`start`            |Serve your dev app at `localhost:3000`|
|`start:prod`       |Serve your prod app at `localhost:3000`|
|`test`             |Run unit tests with Jest|
|`test:watch`       |Run `test` in watch mode to re-run tests when changed|
|`test:coverage`    |Generate information about coverage to ./coverage|

## Testing
To add a unit test, create a `.spec.tsx` or `.test.tsx` file anywhere inside of `./src`. Jest and webpack will automatically find these files.
