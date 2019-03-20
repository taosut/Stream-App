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