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

  onSubmit(formValues) {
    // formValues contains the value of the two fields.
    console.log(formValues);
  }

  render() {
    return (
      <form className="ui form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field name="description" component={this.renderInput} label="Enter Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

export default reduxForm({
  // 'streamCreate' is similar to a state object.
  form: 'streamCreate'
})(StreamCreate);