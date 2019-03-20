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