# Stream App

A react project for learning purpose, taught by Stephen Grider's online course.



## Project Timeline / Notes

### Table of contents

[Initial Setup](#initial-setup)<br>
[Router Setup](#router-setup)<br>
[Navigation Setup](#navigation-setup)<br>
[Component Scaffolding](#component-scaffolding)<br>
[Header Component](#header-component)<br>
[User Authentication](#user-authentication)<br>
[Redux Refactor](#redux-refactor)<br>
[Redux DevTools](#redux-devtools)<br>
[Redux Form](#redux-form)<br>
[RESTful Setup](#restful-setup)<br>


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

12. Create file `src/reducers/authReducer.js`. Create a reducer contains a state object with a key called 'isSignedIn' with default value of *null*. Then create a switch statement on 'action.type'. Use the javascript ... notation to return new object with updated value for 'isSignedIn'.

13. Open `src/reducers/index.js`. Import authReducer and incorporate it inside combineReducers({...}).

14. Open `src/component/GoogleAuth.js`. Create method `mapStateToProps` that returns the object

     ```javascript
     // Note:
     // * isSignedIn will be the props.
     // * state is from the parameter
     // * auth is the reducer name
     // * isSignedIn is the item inside of auth.
     return { isSignedIn: state.auth.isSignedIn }
     ```


15. Remove the previous state object from the class.
16. Remove the `this.setState({...}) ` statement.
17. Check if user is currently logged in. Call the appropriate action creator to update the value of 'isSignedIn' in the authReducer.
18. Pass `mapStateToProps` as the first argument inside `connect(first arg, {...})`.
19. Update `renderAuthButton()` by changing the keywords `this.state` to `this.props`.
20. Refactor the action.type to constant variable instead of strings to avoid unnoticed spelling errors.

*Note: To get user ID use the command line in console `gapi.auth2.getAuthInstance().currentUser.get().getId()`. We want to store this ID inside our authReducer. So in the future, we know which user created which streams.*

21. Pass the user Id into signIn action-creator as an argument and return it as a payload. Inside the authReducer, create a new key inside of the state object called userId with default value of null. If action.type is SIGN_IN then set userId to be action.payload else set to null.

### Redux DevTools

1. Install Redux DevTools chrome extension.

2. Open `src/index.js`. Import `applyMiddleware` and `compose` from react library.

3. Create a const variable. `const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;`.

4. Pass this variable as the second argument inside `createStore(store, second-arg)`.

   ```javascript
   const store = createStore(
     reducers,
     composeEnhancers(applyMiddleware())
   );
   ```

4. Now, the chrome tab of this project will light up the Redux DevTools icon. The state tab shows the current state inside the redux store. The left panel shows the history of action creators invoked and allow us to jump back in time.
5. Debug Session allows Redux DevTools to save the redux store changes between refreshes by `localhost:3000?debug_session=<some_string>`.

### Redux Form

1. Install redux-form to project `npm install redux-form`.

2. Open file `src/reducers/index.js`. The redux-form already created a reducer for us from the library. Pull this reducer out of the library and hook it up to combineReducers.

   ```javascript
   import { reducer as formReducer } from 'redux-form';
   
   // 'form' is a keyword.
   export default combineReducers({ form: formReducer });
   ```

   Note: Inside of Redux DevTools, we now see a new reducer called 'form' inside `State > Tree`.

3. Open file `src/components/streams/StreamCreate.js`. Refactor this functional-based component to a class-based component, because we want to later create helper methods.

4. Import two modules from redux-form `import { Field, reduxForm } from 'redux-form'`. From the naming conventions, we can tell that 'Field' is a react component, and 'reduxForm' is a function which has the same functionality as the 'connect()' function that we have used previously. It makes sure that we can call some action-creators and get some form data into out component (automatically).

5. Connect reduxForm() to StreamCreate(). Unlike connect(), reduxForm() takes a single object with configurations.

   ```javascript
   export default reduxForm({ form: 'streamCreate' })(StreamCreate);
   ```

   Now, this component has a bunch of props.

6. Add a form with two fields for the purpose of inputting the name and description of the stream.

   ```javascript
   <form>
     <Field name="title" component={this.renderInput} />
     <Field name="description" component={this.renderInput} />
   </form>
   ```

   ```jsx
   // formProps is an object from redux-form Field.
   renderInput(formProps) {
     return <input onChange={formProps.input.onChange} value={formProps.input.value} />;
   }
   ```

7. Refactor the syntax

   ```jsx
   renderInput({ input }) {
       return (
       	<input {...input} />
       );
   }
   ```

8. Add labels to both fields

   ```jsx
   // redux-form doesn't recognize 'label' so it will pass it as a key and value
   // inside 'formProps' as a key and value.
   <Field component={renderInput} name="title" label="Enter Title" />
   <Field component={renderInput} name="description" label="Enter Description" />
   
   renderInput({ input, label }) {
       return (
           <label>{label}</label>
       	<input {...input} />
       );
   }
   ```


9. To format the fields and labels, add `className="ui form"` in the parent `<form>` of the two Field's.

10. Now to handle form submission. Create onSubmit() helper function.

    ```javascript
    onSubmit(formValues) {
        // formValues contains values from our fields, including blank submission.
    }
    ```

11. Add an `onSubmit` property to the `<form>` element.

    ```jsx
    <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
    	...
    </form>
    ```

12. Create a function `validate()` to handle streamCreate validations. Inside this function, there's an `error = {}` object that will get key-value pairs of errors if there are any. This function returns the `error` object.

13. To wire the `validate()` function up to redux-form, we need to pass it into the `reduxForm({...})`  as a key-value pair.

    ```javascript
    export default reduxForm({
        form: 'streamCreate',
        validate: validate // or just validate.
    })(streamCreate);
    ```

14. Inside `renderInput()`, destructure one additional property 'meta'. This property contains the error message. Inside `renderInput()`, print `meta.error` under the `<input>`.

15. We can optionally turn auto-complete feature off.

    ```jsx
    <input autoComplete='off' />
    ```

16. When user deselects the field, we want to display error messages (if there are any). Create a helper method `renderError` to do this, since we want to properly format the messages with *classNames* as well.

    ```javascript
    renderError({ error, touched }) {
        if (error && touched ) {
            ...
        }
    }
    ```

    Note: Turn `renderInput()` into an arrow function to fix context error.

17. However, semantic-ui by default hides error messages. Inside `<form>` just add a `className`  called 'ui error'.

18. Additionally, adding `className="error"` parent `<div className="field">` of `<input>` will make the input field highlighted in red by default. But, we only want to add this className if there's an error AND if user deselects the field.

    ```jsx
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    
    <div className={className}>
    ...
    </div>
    ```

### RESTful Setup

1. Reference documentation `npmjs.com/package/json-server`.

2. RESTful Conventions

   | Action                    | Method | Route        |
   | ------------------------- | ------ | ------------ |
   | List of all records       | GET    | /streams     |
   | Get one particular record | GET    | /streams/:id |
   | Create record             | POST   | /streams     |
   | Update a record           | PUT    | /streams/:id |
   | Delete a record           | DELETE | /streams/:id |

3. Store the previous react project in a directory called 'client'. Now create a new directory call 'api'. Inside this folder, run `npm init` and press 'enter' all the way through.

4. Install the json-server: `npm install --save json-server`.

5. Open up 'api' directory in code editor. Create a new file called `db.json`.

   ```json
   {
     "streams": []
   }
   ```

6. Open file `api/package.json` and delete the line `"test": "echo \"Error: no test specified\" && exit 1"`. Replace it with `"start": "json-server -p 3001 -w db.json"`. This tells the script to start json-server with port 3001 and watch the db.json file for any changes that gets made to it.

7. Now in the terminal within the 'api' directory, run `npm start`. Notice under **Resources**, we have `http://localhost:3001/streams`, thus we can make use of this json-server to manipulate the list of streams that are stored inside the api server by following all of the RESTful conventions. (For example, if we want to get the list of all streams, we make a GET request to `http://localhost:3001/streams`, and etc.)

   Note: We are now running on two terminal windows; one for the react-app and the other for json-server.

   **Plan:** Every time when our user submits a form from the 'StreamCreate' component, we want to make an AJAX request or a network request to our api running at localhost 3001. To make a network request, we first define an action-creator, then wire-up the action-creator to our component via connect(). The action-creator will be called by `onSubmit()`. The action-creator is going to use 'axios' to make network request to our api.

8. Install axios and redux-thunk inside client directory: `npm install --save axios redux-thunk`.

9. Create new directory `client/src/apis`.

10. Create new file `client/src/apis/streams.js`.

    ```javascript
    import axios from 'axios';
    
    export default axios.create({
        // Locate baseURL from json-server terminal under 'Home'.
        baseURL: 'http://localhost:3001'
    });
    ```

11. Open file `client/actions/index.js`. Import 'streams' axios instance we just created.

    ```javascript
    import streams from '../apis/streams'
    ```

    Create an action-creator to handle making network request.

    ```javascript
    export const createStream = (formValues) => {
      // Create async action-creator; use redux-thunk.
      // Return an arrow function from our action-creator.
      return async (dispatch) => {
        // POST request with axios.
        // Passing in all the formValues. (example: title, description)
        streams.post('/streams', formValues);
      }
    }
    ```

12. Open file `client/src/components/streams/StreamCreate`. Hook up the action-creator we just created to StreamCreate component.

    ```javascript
    import { connect } from 'react-redux';
    import { createStream } from '../../actions';
    
    ...
    
    /*export default*/ const formWrapped = reduxForm({
      // 'streamCreate' is similar to a state object.
      form: 'streamCreate',
      validate: validate
    })(StreamCreate);
    
    export default connect(null, { createStream: createStream })(formWrapped);
    ```

13. Finally to wire-up 'Redux Thunk', open up `client/src/index.js`.

    ```javascript
    import reduxThunk from 'reduxThunk';
    ```

    Pass it in as an argument to 'applyMiddleware()'.

    ```javascript
    const store = createStore(
      reducers,
      composeEnhancers(applyMiddleware(reduxThunk))
    );
    ```

14. Test the action-creator out by going to `localhost:3000/streams/new` and submit form. Check `Network > XHR` tab in chrome. If there's a POST request and status is 201, then it means it worked.

15. In the 'createStream' action-creator, we need to get a handle to the network request response that came back from the POST request.

    ```javascript
    const response = streams.post('/streams', formValues);
    ```

16. Now, dispatch an action with the payload of that stream. Then we can eventually create a reducer and pick up that stream we just created to do whatever we need to do with it.

    Create a new action-creator type in `client/src/actions/types.js`

    ```javascript
    export const CREATE_STREAM = 'CREATE_STREAM';
    ```

    Back inside `createStream() = formValues => async dispatch => { ... }`

    ```javascript
    dispatch({ type: CREATE_STREAM, payload: response.data });
    ```

17. RESTful Convention w/ Response column:

    | Action                    | Method | Route        | Response         |
    | ------------------------- | ------ | ------------ | ---------------- |
    | List of all records       | GET    | /streams     | Array of records |
    | Get one particular record | GET    | /streams/:id | Single record    |
    | Create record             | POST   | /streams     | Single record    |
    | Update a record           | PUT    | /streams/:id | Single record    |
    | Delete a record           | DELETE | /streams/:id | Nothing          |

18. From this RESTful convention table, we can create all the action-creators right now.

    Create types for each action-creator inside `types.js`:

    ```javascript
    export const FETCH_STREAMS = 'FETCH_STREAMS';
    export const FETCH_STREAM = 'FETCH_STREAM';
    export const DELETE_STREAM = 'DELETE_STREAM';
    export const EDIT_STREAM = 'EDIT_STREAM';
    ```

    Import all of them inside `actions/index.js`:

    ```javascript
    import { 
      SIGN_IN, 
      SIGN_OUT, 
      CREATE_STREAM,
      FETCH_STREAMS,
      FETCH_STREAM,
      DELETE_STREAM,
      EDIT_STREAM 
    } from './types';
    ```

    Create a draft for all the action-creators:

    ```javascript
    export const fetchStreams = () => {
      return async (dispatch) => {
        // Make GET request to '/streams' using our axios instance.
        const response = await streams.get('/streams');
    
        dispatch({ type: FETCH_STREAMS, payload: response.data });
      };
    };
    
    export const fetchStream = (id) => {
      return async (dispatch) => {
        const response = await streams.get(`/streams/${id}`);
        
        dispatch({ type: FETCH_STREAM, payload: response.data });
      };
    };
    
    export const editStream = (id, formValues) => {
      return async (dispatch) => {
        const response = await streams.put(`/streams/${id}`, formValues);
    
        dispatch({type: EDIT_STREAM, payload: response.data});
      };
    };
    
    export const deleteStream = (id) => {
      return async (dispatch) => {
        // We don't get any response.
        await streams.delete(`/streams/${id}`);
    
        dispatch({ type: DELETE_STREAM, payload: id });
      };
    };
    ```

19. Updating Reducer Syntaxes

    | Action                             | Bad                | Good                                              |
    | ---------------------------------- | ------------------ | ------------------------------------------------- |
    | Removing an element from an array  | state.pop()        | state.filter(element => element !== 'hi')         |
    | Adding an element to an array      | state.push('hi')   | [...state, 'hi']                                  |
    | Replacing an element in an array   | state[0] = 'hi'    | state.map(el => el === 'hi'? 'bye' : el)          |
    | Updating a property in an object   | state.name = 'Sam' | {...state, name: 'Sam'}                           |
    | Adding a property to an object     | state.age = 30     | {...state, age: 30}                               |
    | Removing a property from an object | delete state.name  | {...state, age: undefined}; _.omit{state, 'age'}; |

20. Create `streamReducer.js`. Install lodash `npm install --save lodash`.

    ```javascript
    import _ from 'lodash';
    
    import { 
      CREATE_STREAM,
      FETCH_STREAMS,
      FETCH_STREAM,
      DELETE_STREAM,
      EDIT_STREAM 
    } from '../actions/types';
    
    export default (state = {}, action) => {
      switch (action.type) {
        case CREATE_STREAM:
          return { ...state, [action.payload.id]: action.payload };
    
        // Require lodash library
        // _.mapKeys() takes the action.payload array and returns
        // an object with keys assigned to each element in action.payload.
        // The key is the value 'id' in each of the original array elements.
        case FETCH_STREAMS:
          return {...state, ..._.mapKeys(action.payload, 'id')}
    
        case FETCH_STREAM:
          return { ...state, [action.payload.id]: action.payload };
    
        // Require lodash library.
        case DELETE_STREAM:
          return _.omit(state, action.payload);
    
        case EDIT_STREAM:
          return { ...state, [action.payload.id]: action.payload };
    
        default:
          return state;
      }
    }
    ```

21. Inside `client/src/reducers/index.js`

    ```javascript
    import streamReducer from './streamReducer';
    
    export default combineReducers({
      ...,
      streams: streamReducer
    });
    ```

22. Connect the **fetchStreams** action-creator to **StreamList** component. Inside StreamList.js

    ```javascript
    class StreamList extends React.Component {
      componentDidMount() {
        // Call action-creator.
        this.props.fetchStreams();
      }
    
      render() {
        return (
          <div>Stream List</div>
        );
      }
    }
    
    export default connect(null, { fetchStreams: fetchStreams })(StreamList);
    ```

23. Now we want to render all streams we have inside json-server on the **StreamList** component. We need to get our list of stream availalbe as props. We know they're right now stored inside the streams reducer inside our store. So, we create a mapStateToProps method and pass it into connect().

    ```javascript
    import { connect } from 'react-redux';
    import { fetchStreams } from '../../actions';
    
    const mapStateToProps = (state) => {
      // Object.values gets rid of the key, and turns each value in the object
      // into an element of the returned array.
      return { streams: Object.values(state.streams) }
    };
    
    export default connect(mapStateToProps, { fetchStreams: fetchStreams })(StreamList);
    ```

24. Create a new function called `renderList()` to style each stream inside `this.props.streams` and show it on the screen. Then, call this function inside `render()`.

    ```javascript
      renderList() {
        return this.props.streams.map((stream) => {
          // jsx
          return (
            <div className="item" key={stream.id}>
              <i className="large middle aligned icon camera" />
              <div className="content">
                {stream.title}
                <div className="description">{stream.description}</div>
              </div>
            </div>
          );
        });
      }
    
      render() {
        return (
          <div>
            <h2>Streams</h2>
            <div className="ui celled list">
              {this.renderList()}
            </div>
          </div>
        );
      }
    ```

