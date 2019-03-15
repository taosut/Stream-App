# Stream App

A react project for learning purpose, taught by Stephen Grider's online course.



## Project Timeline / Notes

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

### Component Scaffolding

The general plan is to create the following structure:

| Path            | Component    |
| --------------- | ------------ |
| /               | StreamList   |
| /streams/new    | StreamCreate |
| /streams/edit   | StreamEdit   |
| /streams/delete | StreamDelete |
| /streams/show   | StreamShow   |

1. Create a new directory *streams* inside `src/components/`.

2. Inside *streams*, create *StreamList.js*, *StreamCreate.js*, *StreamEdit.js*, *StreamDelete.js*, *StreamShow.js*.

3. Inside each component files, create a boilerplate to show some text on the screen.

4. Inside *App*, delete *PageOne* and *PageTwo* (no longer needed) and import the five new components.

5. Finally, setup the five routes with proper paths inside

   ```jsx
   <BrowserRouter>...</BrowserRouter>
   ```

### Header Component

1. Import Semantic UI to index.html.
2. Create *Header.js* inside 'components' directory.
3. Style the *Header* component to be ``className = "ui secondary pointing menu"``.
4. Import *Link* from *react-router-dom* library. 
5. Create button inside the header to navigate back to root path with ``<Link>``.
6. Back to App.js, add a class name called 'ui container' to the ``<div>`` above ``<BrowserRouter>``.
7. Import *Header* component and invoke it inside ``<BrowserRouter>`` on the very top.

### User Authentication

1. Create new project in Google API, and obtain the Client ID.

2. Add the Google API library to index.html ``<script src="https://apis.google.com/js/api.js"></script>``. Should now be able to type ``gapi`` in chrome console.

3. Create new component *GoogleAuth.js* with boilerplate.

4. Import this component inside *Header.js*.

5. Call the *GoogleAuth* component under 'right menu'.

   *Notes: 'gapi' is a multi-purpose google api library. We are using this to interact from google oauth flow. The library is very large, therefore whenever we want to use it, we only load up the specific internal library that we want to use. Example: ``gapi.load('client:auth2')``. Now we have additional functions to use. We can then initialize this library with our Client ID by calling ``gapi.client.init({clientId: 'clientidhere'})``.*

6. Now, we do this in javascript. Inside GoogleAuth.js call ``window.gapi.load('client:auth2')`` inside ``componentDidMount()``.

7. Now, whenever GoogleAuth is loaded, it will make a call to retrieve this additional library from google api. We need to create a callback to know when this process is complete. Simply add a callback function as the second argument and initialize our client id as mentioned above. And set ``scope: 'email'`` as we only want to get permission to access user's email.

   *Note: For documentation, reference ``https://developers.google.com/api-client-library/javascript/reference/referencedocs#authentication``. In the console, try*

   ```javascript
   const auth = gapi.auth2.getAuthInstance();
   ```

   *This method returns a GoogleAuth object which contains methods that allows us to check if a user is signed in and so on. Try*

   ```javascript
   auth.signIn()
   ```

   *This will invoke a popup for user to choose their google account to sign in. Now,*

   ```javascript
   auth.isSignedIn.get() // returns true
   ```

8. Chain the `window.gapi.client.init({...})` with `.then(() => {...})` to retrieve GoogleAuth object after gapi is successfully initialized with client ID. Then, create a state variable `state = { isSignedIn: null }`, and update this variable with `this.setState({ isSignedIn: this.auth.isSignedIn.get() })` inside componentDidMount() method.

9. Create a helper method `renderAuthButton()` to check the user signed-in state and display the appropriate text message. Invoke this method inside `render()`.

   *Note: test the code out in console by logging in and logging out via calling `gapi.auth2.getAuthInstance().signIn()` and etc.*

10. Added `listen(this.onAuthChange)` to update the state variable 'isSignedIn' whenever the user signs in or signs out.

11. Instead of showing status message, change the renderAuthButton() method to display appropriate buttons instead.

12. Create click event handlers for the login and logout buttons. Create two methods call `onSignInClick()` and `onSignOutClick()` where their definition invokes the google api to sign-in or sign-out. These methods are used in the ``onClick`` property of the buttons. Reminder to not include the parenthesis (example: `onClick="onSignInClick"`) to avoid invoking this method upon loading on the screen.

### Redux Refactor

1. Install dependencies `npm install --save redux react-redux`.
2. Create directory `src/actions`.
3. Create file `src/actions/index.js`. (Action creators goes in here.)
4. Create directory `src/reducers`.
5. Create file `src/reducers/index.js`.
6. Inside `reducers/index.js` create boilerplate.

    ```javascript
    import { combineReducers } from 'redux';

    export default combineReducers({
        // Dummy
        replaceMe: () => 'asdf'
    });
    ```

7. Inside `src/index.js` add the following lines,

   ```javascript
   import { Provider } from 'react-redux';
   import { createStore } from 'redux';
   import reducers from './reducers'
   ```

   ```javascript
   const store = createStore(reducers)
   ```

   ```jsx
   ReactDOM.render(
   	<Provider store={store}><App /></Provider>,
       document.querySelector('#root')
   );
   ```

8. Inside `actions/index.js` create two action creators `signIn()` and `signOut()` which will be called by onAuthChange() whenever a user has been successfully signed in or signed out. These action creators will return an object with type `SIGN_IN` and `SIGN_OUT` respectively, leaving out the payload attribute.

9. Now we want to hook these action creators up inside the GoogleAuth component. Inside `src/components/GoogleAuth.js` import the following:

   ```javascript
   import { connect } from 'react-redux';
   import { signIn, signOut } from '../actions'
   ```

10. At the bottom, modify the return statement to the following:

    ```javascript
    // Using dummy value since we don't yet have mapStateToProps().
    // Note: signIn() and signOut() actions are now props of this class.
    export default connect(null, { signIn, signOut })(GoogleAuth);
    ```

11. Modify `onAuthChange()` to the following:

    ```javascript
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn();
        } else {
            this.props.signOut();
        }
    }
    ```