import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  renderInput(/*formProps*/ { input, label }) {
    // formProps is an object returned from redux-form Field.
    // return <input onChange={formProps.input.onChange} value={formProps.input.value} />;

    // This ... syntax takes the formProps.input properties (object) and add them as properties
    // to the input element.
    return (
      <div className="field">
        <label>{label}</label>
        <input {.../*formProps.input*/input} />
      </div>
    );
  }

  render() {
    return (
      <form className="ui form">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
      </form>
    );
  }
}

export default reduxForm({
  // 'streamCreate' is similar to a state object.
  form: 'streamCreate'
})(StreamCreate);