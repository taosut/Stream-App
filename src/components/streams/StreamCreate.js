import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamCreate extends React.Component {
  renderInput(formProps) {
    // formProps is an object returned from redux-form Field.
    // return <input onChange={formProps.input.onChange} value={formProps.input.value} />;

    // This syntax takes the formProps.input properties (object) and add them as properties
    // to the input element.
    return <input {...formProps.input} />
  }

  render() {
    return (
      <form>
        <Field name="title" component={this.renderInput} />
        <Field name="description" component={this.renderInput} />
      </form>
    );
  }
}

export default reduxForm({
  // 'streamCreate' is similar to a state object.
  form: 'streamCreate'
})(StreamCreate);