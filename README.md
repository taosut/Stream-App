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
[React Portals](#react-portals)<br>


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

25. We want to show 'edit' and 'delete' buttons only if the stream belongs to that user. Thus, we need to add an extra property to each stream when its first created. Inside the `actions/index.js`

    ```javascript
    export const createStream = (formValues) => {
      // Second argument 'getState' is a function that has access to store.
      return async (dispatch, getState) => {
        // Access 'userId' state property from authReducer.
        const { userId } = getState().auth;
        
        // ES16 syntax to add new property to object then POST request.
        const response = await streams.post('/streams', { ...formValues, userId: userId });
    
        dispatch({ type: CREATE_STREAM, payload: response.data });
      };
    };
    ```

26. Now to show the 'edit' and 'delete' button. Open `streams/StreamList`.

    ```javascript
    const mapStateToProps = (state) => {
      return { 
        streams: Object.values(state.streams),
        // Get currently signed-in user's Id.
        currentUserId: state.auth.userId
      }
    };
    ```

27. Now create a helper function to render the buttons.

    ```javascript
      renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
          return (
            <div className="right floated content">
              <button className="ui button primary">Edit</button>
              <button className="ui button negative">Delete</button>
            </div>
          );
        }
      }
    ```

28. Call `renderAdmin()` inside of `renderList()`.

29. We want to show a 'Create Stream' button on the bottom of the 'StreamList' component. To do this, we need to check if the user is currently signed-in. Inside `streams/StreamList.js`,

    ```javascript
    import { Link } from 'react-router-dom';
    
      renderCreate() {
        if (this.props.isSignedIn) {
          return (
            <div style={{ textAlign: 'right' }}>
              <Link to="/streams/new" className="ui button primary">Create Stream</Link>
            </div>
          );
        }
      }
    ```

30. After the user have successfully created a stream, we want to navigate the user back to the 'StreamList' component. We are going to make use of the 'History' (Created by BrowserRouter) object make change to the address bar. This 'History' object is passed as a prop to all the components inside 'BrowserRouter'. However, we are not trying to do a navigation from a component, but from a action-creator. A good solution is to create the history object ourselves instead, and import it whenever we need to get access to it.

31. Create a new file `src/history.js`

    ```javascript
    import { createBrowserHistory } from 'history';
    
    export default createBrowserHistory();
    ```

32. Inside `src/components/App.js`

    ```jsx
    import history from '../history';
    // Replace BrowserRouter with Router.
    import { Router } from 'react-router-dom';
    
    ...
    <Router history={history}>
        ...
    </Router>
    ...
    ```

33. Back inside `src/actions/index.js`

    ```javascript
    export const createStream = (formValues) => {
      return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await streams.post('/streams', { ...formValues, userId: userId });
        dispatch({ type: CREATE_STREAM, payload: response.data });
    
        // Programmatic Navigation back to StreamList route.
        history.push('/');
      };
    };
    ```

34. URL-based Selection

    | Path                | Component    |
    | ------------------- | ------------ |
    | /                   | StreamList   |
    | /streams/new        | StreamCreate |
    | /streams/edit/:id   | StreamEdit   |
    | /streams/delete/:id | StreamDelete |
    | /streams/:id        | StreamShow   |

35. The 'Edit' button should navigate the user to the StreamEdit component. Inside StreamList,

    ```jsx
    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
    ```

    We need to fix the StreamEdit path inside App.js as well.

    ```jsx
    <Route path="/streams/edit/:id" exact component={StreamEdit} />
    ```

36. Inside the StreamEdit component, we have a few useful props.

    ```javascript
    this.props.match.params.id // :id from the url.
    ```

    We want to show information of the stream the user is trying to edit. This information is available inside the redux store 'streams'. Inside StreamEdit.js,

    ```javascript
    import { connect } from 'react-redux';
    
    const mapStateToProps = (state, ownProps) => {
      return {
        stream: state.streams[ownProps.match.params.id]
      };
    };
    
    export default connect(mapStateToProps)(StreamEdit);
    ```

    **Unexpected Behavior: ** when user loads up `/streams/edit/:id`, `props.stream` will have the value of  *null*. This happens because when user first loads up our application, the redux state object is empty. However, if the user goes to the root route first (ShowStreams) then click on the 'edit' button, then the state object is properly initialized and `props.stream` will return the correct stream information.

    **Solution:** with React-Router, each component needs to be designed to work in isolation (fetch its own data!).

37. Refactor the StreamEdit component into class-based component. And call action-creator fetchStream().

    ```jsx
    import { fetchStream } from '../../actions';
    
    class StreamEdit extends React.Component {
        componentDidMount() {
            const currentStreamId = this.props.match.params.id;
            this.props.fetchStream(currentStreamId);
        }
        
        render() {
            if (!this.props.stream) {
          		return (
            		<div>Loading...</div>
          		);
            }
            
            return (
          		<div>{this.props.stream.title}</div>
        	);
        }
        
        // mapStateToProps method is unchanged.
        // ...
        
        export default connect(mapStateToProps, {fetchStream: fetchStream})(StreamEdit);
    }
    ```

38. Now we want to reuse some code from StreamCreate to StreamEdit. The only difference is the action-creator being called when the user clicks on Submit button. This is where we reuse code. Inside `components/streams` make a new js file `StreamForm.js`. This form will be reused between StreamCreate and StreamEdit. Copy over the code from StreamCreate to StreamForm

    ```jsx
    // External Imports
    import React from 'react';
    import { Field, reduxForm } from 'redux-form';
    
    // Change #7: Remove the import { connect } and the createStream action-creator.
    // import { connect } from 'react-redux';
    // import { createStream } from '../../actions';
    
    // Change #1: Class Name changed from StreamCreate to StreamForm.
    class StreamForm extends React.Component {
      renderError({ error, touched }) {
        if (touched && error) {
          return (
            <div className="ui error message">
              <div className="header">
                {error}
              </div>
            </div>
          );
        }
      }
    
      renderInput = ({ input, label, meta }) => {
        const fieldClassName = `field ${meta.touched && meta.error ? 'error' : ''}`;
    
        return (
          <div className={fieldClassName}>
            <label>{label}</label>
            <input {...input} autoComplete="off" />
            {this.renderError(meta)}
          </div>
        );
      }
    
      // Change #6: We don't want StreamForm to decide how to handle submission of the form.
      //            Instead, StreamForm should attempt to call a callback passed down from props
      //            from some parent component. (e.g. StreamCreate or StreamEdit.)
      //            So, rather than calling the createStream action-creator, we call
      //            this.props.onSubmit(formValues).
      //            Now we expect the parent component to pass down a callback called onSubmit.
      onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
      }
    
      render() {
        return (
          <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field name="title" component={this.renderInput} label="Enter Title" />
            <Field name="description" component={this.renderInput} label="Enter Description" />
            <button className="ui button primary">Submit</button>
          </form>
        );
      }
    }
    
    const validate = (formValues) => {
      const errors = {};
    
      if (!formValues.title) {
        errors.title = 'You must enter a stream title';
      }
    
      if (!formValues.description) {
        errors.description = 'You must enter a stream description';
      }
    
      return errors;
    };
    
    // Change #2: Class Name changed from StreamCreate to StreamForm in second paranthesis.
    // Change #4: Since we removed 'export default connect()()' in Change #3,
    //            we now going to `export default reduxForm()()`.
    
    // const formWrapped = reduxForm({
    //   form: 'streamCreate',
    //   validate: validate
    // })(StreamForm);
    
    // Change #5: Change the name of the form from streamCreate to streamForm. (Optional)
    export default reduxForm({
      form: 'streamForm',
      validate: validate
    })(StreamForm);
    
    // Change #3: StreamForm doesn't need to call any action-creator;
    //            the parent component is responsible for calling action-creator.
    //            So, we remove the second argument inside connect(first arg, second arg).
    //            Now we notice we don't need the connect function at all, so we remove it entirely.
    
    // export default connect(null)(formWrapped);
    ```

39. Back inside StreamCreate, we need to refactor the code so it uses the StreamForm we just created. It should show a instance of StreamForm and passes a callback onSubmit and nothing else.

    ```jsx
    // External Imports
    import React from 'react';
    
    // Change #1: We don't need Field and reduxForm()() anymore since we are
    //            calling an instance of StreamForm.
    // import { Field, reduxForm } from 'redux-form';
    import { connect } from 'react-redux';
    
    // Internal Imports
    import { createStream } from '../../actions';
    // Change #2: Import the StreamForm component we just created.
    import StreamForm from './StreamForm';
    
    class StreamCreate extends React.Component {
      // We only care about meta.error and meta.touch
      // Change #3: We don't need to render errors anymore, since this logic is already
      //            copied over to StreamForm.
      // renderError({ error, touched }) {
      //   if (touched && error) {
      //     return (
      //       // Note that ui semantic by default hides error messages.
      //       <div className="ui error message">
      //         <div className="header">
      //           {error}
      //         </div>
      //       </div>
      //     );
      //   }
      // }
    
      // Change #4: We don't need to render inputs anything, since this logic is already
      //            copied over to StreamForm.
      // renderInput = (/*formProps*/ { input, label, meta }) => {
      //   // formProps is an object returned from redux-form Field.
      //   // return <input onChange={formProps.input.onChange} value={formProps.input.value} />;
    
      //   // This ... syntax takes the formProps.input properties (object) and add them as properties
      //   // to the input element.
      //   const fieldClassName = `field ${meta.touched && meta.error ? 'error' : ''}`;
    
      //   return (
      //     <div className={fieldClassName}>
      //       <label>{label}</label>
      //       <input {.../*formProps.input*/input} autoComplete="off" />
      //       {this.renderError(meta)}
      //     </div>
      //   );
      // }
    
    
      onSubmit = (formValues) => {
        // formValues contains the value of the two fields.
        // console.log(formValues);
    
        this.props.createStream(formValues);
      }
    
      render() {
        return (
          // Change #5: We don't need to show form anymore, again it's done in StreamForm.
          // <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          //   <Field name="title" component={this.renderInput} label="Enter Title" />
          //   <Field name="description" component={this.renderInput} label="Enter Description" />
          //   <button className="ui button primary">Submit</button>
          // </form>
    
          // Change #6: Call an instance of StreamForm component and pass in onSubmit callback.
          <div>
            <h3>Create a Stream</h3>
            {/* onSubmit will become a prop inside StreamForm. */}
            <StreamForm onSubmit={this.onSubmit}></StreamForm>
          </div>
        );
      }
    }
    
    // Change #7: No longer need validate() as StreamForm has it.
    // Make sure the user doesn't create a stream with empty title and description.
    // validate() is called whenever it is intially rendered or when user interacts
    // with it.
    // const validate = (formValues) => {
    //   const errors = {};
    
    //   // formValues.title comes from the 'name' property from <Field>
    //   if (!formValues.title) {
    //     // If user didn't enter title.
    //     errors.title = 'You must enter a stream title';
    //   }
    
    //   if (!formValues.description) {
    //     errors.description = 'You must enter a stream description';
    //   }
    
    //   // * If the error name is identical to the formValues.name then this error
    //   //   will be passed to the component that renders that Field. (renderInput())
    //   return errors;
    // };
    
    // Change #8: No longer need wrapping as it's done inside StreamForm already.
    // /*export default*/ const formWrapped = reduxForm({
    //   // 'streamCreate' is similar to a state object.
    //   form: 'streamCreate',
    //   validate: validate
    // })(StreamCreate);
    
    // Change #9: Don't need 'formWrapped' in the second paranthesis anymore.
    //            Replace it with StreamCreate.
    export default connect(null, { createStream: createStream })(/*formWrapped*/StreamCreate);
    ```

40. After this big refactor, check in browser to see if there's any error in StreamCreate component.

41. Now refactor StreamEdit.

    ```jsx
    import React from 'react';
    import { connect } from 'react-redux';
    // Change #1: import editStream action-creator.
    import { fetchStream, editStream } from '../../actions';
    // Change #2: import StreamForm component.
    import StreamForm from './StreamForm';
    // Change #6: import lodash
    import _ from 'lodash';
    
    class StreamEdit extends React.Component {
      componentDidMount() {
        // Call action-creator fetchStream
        const currentStreamId = this.props.match.params.id;
    
        // The action-creator gets the :id from url params.
        // Then it creates a network request to db.json and obtains the stream with this id.
        // Then it dispatches the payload with this stream to streamReducer.
        // The reducer updates/adds this stream property inside its state object.
        this.props.fetchStream(currentStreamId);
      }
    
      // Change #3: Create a onSubmit callback function to pass into StreamForm.
      onSubmit = (formValues) => {
        // Change #8: Call the editStream action-creator instead of just printing out the formValues.
        // console.log(formValues);
        this.props.editStream(this.props.stream.id, formValues);
      }
    
      render() {
        if (!this.props.stream) {
          return (
            <div>Loading...</div>
          );
        }
    
        return (
          // Change #4: Delete the the <div> that prints stream title. And
          //            call the StreamForm instance with the callback onSubmit function.
          // <div>{this.props.stream.title}</div>
          <div>
            <h3>Edit a Stream</h3>
            {/* Change #5: Pass in a prop called 'initialValues' (redux-form keyword). */}
            {/*            The outer brackets indicate that we're trying to write js code. */}
            {/*            The inner brackets indicate that we're trying to create an object. */}
            {/*            The reason that we're creating a title and description key is because */}
            {/*            we have two Field elements and their name prop is title and description. */}
            <StreamForm 
              // initialValues={{ title: this.props.stream.title, description: this.props.stream.description }} 
              
              // Change #7: Equivalent to the commented line above, but using lodash method.
              initialValues = {_.pick(this.props.stream, 'title', 'description')}
              onSubmit={this.onSubmit}
            />
          </div>
        );
      }
    }
    
    // The first argument state refers to the object inside combineReducers().
    // The second argument gets access to all the props of the current component.
    const mapStateToProps = (state, ownProps) => {
      return {
        // We need to get access to props.match.params.id.
        // * Unexpected behavior: stream is null if user loads to this route first,
        //   instead of clicking the 'edit' button from StreamList.
        stream: state.streams[ownProps.match.params.id]
      };
    };
    
    // Change #5: Pass in editStream action-creator to connect()().
    export default connect(mapStateToProps, { 
      fetchStream: fetchStream,
      editStream: editStream
    })(StreamEdit);
    ```

42. Back inside the action-creator, we should programmatically navigate the user back to the root route after the action has been dispatched. 

    **PROBLEM:** However, after testing out the edit submission, the two buttons are gone. After checking `Network > XHR > streams GET > Response`, the userId prop has disappeared. This happens because 'userId' is not a property of the formValues that we passed into editStream for updating.

    **SOLUTION**: Instead of using PUT request inside editStream, we use PATCH request. (PUT request updates all properties of a record; PATCH request updates some properties of a record.)

### React Portals

1. Create new file `public/modal.html`.

   ```html
   <head>
   
   </head>
   <body>
     I am a modal example
   </body>
   ```

   We can access this file via url:

   `http://localhost:3000/modal.html`

2. After confirming that it works, now

   ```html
   <head>
   
   </head>
   <body>
     <div class="sidebar">I am a sidebar.</div>
     <div class="content">
       <h1>I am some content.</h1>
     </div>
   </body>
   ```

3. Now let's write some CSS to style.

   ```html
   <head>
     <style>
       .sidebar {
         /* fixed position means the element will be at the same location regardless if
             user scrolls up or down. */
         position: fixed;
         top: 0;
         left: 0;
         height: 100vh;
         width: 300px;
         background: green;
       }
   
       .content {
         margin-left: 300px;
       }
     </style>
   </head>
   ...
   ```

4. Finally, let's create a div for modal. Make sure it's on top of the other two divs.

   ```html
     <!-- Outer div serves as grey background behind it. -->
     <!-- The inner div is the white window with message and action -->
     <div class="modal">
       <div class="modal-body">
         <h1>I am a modal.</h1>
       </div>
     </div>
   ```

5. Style the modal.

   ```css
   .modal-body {
       background-color: white;
       margin: auto;
       height: 30%;
       width: 30%;
   }
   
   .modal {
       height: 100%;
       width: 100%;
       position: fixed;
       background-color: grey;
       left: 0;
       top: 0;
   }
   ```

   There's a **problem**: we still see the green side bar on the left-hand side. Ideally we want the sidebar behind the modal.

   **Solution**: use z-index css property.

   ```css
   .modal {
       ...
       z-index: 10;
   }
   ```

6. Now, wrap the 'modal' with a new div with class name 'positioned'.

   ```html
   <div class="positioned">
       <div class="modal">
           <div class="modal-body">
               <h1>I am a modal.</h1>
           </div>
       </div>
   </div>
   ```

   Style it,

   ```css
   .positioned {
       position: relative;
       z-index: 0;
   }
   ```

   Now, we see that the modal is behind the sidebar again. **Why is that?**

   Whenever we have an element with relative position and some z-index, we've created something called *stacking context* with css. Thus, we no longer compare sidebar's z-index with the modal's z-index, but we are comparing sidebar's z-index with the root element that was the stacking context that contains the modal. (In this case, we are comparing sidebar with z-index of zero and positioned with z-index of zero.) In other words, the z-index is compared between root elements.

   This is a problem for our react app, since our modal is nested all the way deep inside.

   **Solution:** instead of showing modal as a child of positioned, we are going to show modal as a child of the body. This is where react-portal comes into play. Recall, inside our react-app, every component is a child of the div with id of 'root'. Using portal, we can have StreamDelete to render a modal component but don't want it to render it as a direct child. We can render it as a child of some other element, such as the body element.

   In other words, we are making use of portals to get around of *context stacking* issue of css. 

7. Create the modal component js file `components/modal.js`:

   ```jsx
   import React from 'react';
   // Notice we usually only import ReactDOM in src/index.js only.
   import ReactDOM from 'react-dom';
   
   const Modal = (props) => {
     // When we create a portal, the return value of our componet is going to change a bit.  
     // This createPortal() function is going to take two arguments.
     // * The first argument is going to be some jsx to show on the screen.
     // * The second argument renders the two modal divs as child of the body element.
     // Note: if we are actually going to render the modal as a child of the body, then
     //       we will be replacing everything inside the body with modal. So instead,
     //       we will go into index.html and create a new <div> with some id. Then,
     //       target that <div> to target and place our modal into.
     return ReactDOM.createPortal (
       <div className="ui dimmer modals visible active">
         <div className="ui standard modal visible active">
           asdfasdf sdfasdfsadf
         </div>
       </div>,
   
     );
   };
   
   export default Modal;
   ```

   Inside `public/index.html`, create a div with id 'modal':

   ```html
   <div id="root"></div>
   <div id="modal"></div>
   ```

8. Back inside Modal component, we provide a selector to that div in the second argument.

   ```jsx
   return ReactDOM.createPortal (
       <div className="ui dimmer modals visible active">
         <div className="ui standard modal visible active">
           asdfasdf sdfasdfsadf
         </div>
       </div>,
       document.querySelector('#modal')
     );
   ```

9. Now to render this modal on the screen, we go to StreamDelete component:

   ```jsx
   import Modal from '../Modal';
   
   const StreamDelete = () => {
     return (
       <div>
         Stream Delete
         <Modal />
       </div>
     );
   };
   ...
   ```

10. For reference to Modals module: `https://semantic-ui.com/modules/modal.html`

    Notice that a modal has three components: header, content, and actions. Now, back inside Modal.js:

    ```jsx
    <div className="ui dimmer modals visible active">
        <div className="ui standard modal visible active">
            {/* Fill in modal with header, content, and actions. */}
            <div className="header">Delete Stream</div>
            <div className="content">Are you sure you want to delete this stream?</div>
            <div className="actions">
                <button className="ui button primary">Delete</button>
                <button className="ui button">Cancel</button>
            </div>
        </div>
    </div>
    ```

    **Problem**: When we click outside of the modal, the modal still stays on the screen. Ideally, we want to dismiss the window when user clicks outside of the modal window.

    **Solution**: Notice user only sees the modal at route `/streams/delete`. If we navigate the user back to `/streams` the user shouldn't see the modal anymore.

    ```jsx
    import history from '../history';
    
    <div onClick={() => history.push('/')} className="ui dimmer modals visible active">
        ...
    </div>
    ```

    **Problem**: If the user clicks on the white areas inside the modal, the app still navigates the user back to root route. This is caused by *event propagation*. If we trigger some event in the child element and that child element does not handle that event, then that event is eventually going to bubble up to some parent element until it gets caught with event handler. (i.e. If we click on anything inside the modal, this click event will eventually bubble up to the root div with programmatic navigation onClick event handler.)

    **Solution**: We can add a onClick event handler to the div right below the root div to stop it there.

    ```jsx
    <div onClick={() => history.push('/')} className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation()} className="ui standard modal visible active">
            ...
    </div>
    ```

11. Right now, our modal is hardcoded. We want it to be reusable. The modal should be configured by some props that the parent component.

    StreamDelete.js:

    ```jsx
    const actions = (
        <div>
          <button className="ui button negative">Delete</button>
          <button className="ui button">Cancel</button>
        </div>
    );
    
    return (
        <div>
            Stream Delete
            <Modal 
                title="Delete Stream"
                content="Are you sure you want to delete this stream?"
                actions={actions}
                />
        </div>
    );
    ```

    

    Modal.js:

    ```jsx
    <div className="header">{props.title}</div>
    <div className="content">{props.content}</div>
    <div className="actions">{props.actions}</div>
    ```

    **Problem**: The buttons are are alittle bit placed against the button of the modal. But if we only have one button in the actions jsx variable, the button is aligned correctly. When we have an extra div inside of our class name actions, semantic-ui does not style them correctly. 

    **Solution**: 