# Stream App

A react project for learning purpose, taught by Stephen Grider's online course.



## Project Timeline

### Initial Setup

1. Install latest version of Nodejs.
2. Install create-react-app by running the command line `npm install -g create-react-app`.
3. Generate the react project by running the command line `create-react-app stream-app`.
4. Remove all the files under the *src* directory.
5. Create *index.js* and *components/App.js* under *src* directory with boilerplate code to display some message on the screen.

### Router Setup

1. Install react router by running the command line `npm install --save react-router-dom`.

2. Import react router inside *App* component. `import { BrowserRouter, Route } from 'react-router-dom'`.

3. Setup *PageOne* and *PageTwo* components as routes inside *App*.

   ```jsx
   <BrowserRouter>
     <div>
       <Route path="/" exact component={PageOne} />
       <Route path="/pagetwo" component={PageTwo} />
     </div>
   </BrowserRouter>
   ```

   *Note: Given address `localhost:3000/` the extracted path is the string `/`. React router will try to match the extracted path with the paths of each Route elements. If the extracted path contains any substrings that matches any of the Route paths then these routes will get invoked to show on the screen. The keyword `exact` tells react router to invoke this route only if the extracted path exactly matches this Route path.*

### Navigation Setup

*Note: The tradition way of using href inside anchor tags does not work with React. Because every time a user clicks on an anchor tag, the index.html get reloaded (dumps old index.html) and all state variables will be lost as well.*

1. Import *Link* module from *react-router-dom* library. `import { Link } from 'react-router-dom'`.

2. Instead of using *anchor* tags, we use *Link* tags. And instead of using *href* attribute, we use *to* attribute.

   ```jsx
   <Link to="/pagetwo">Navigate to Page Two</Link>
   ```

   *Note: The Link element overwrites the anchor tag and prevents the browser from making new request, but just show/hide different components instead. This is called Single Page App (SPA) which makes use of a single index.html document only.*