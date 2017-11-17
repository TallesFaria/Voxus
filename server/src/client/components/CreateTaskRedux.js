import React from 'react'
import { Field, reduxForm } from 'redux-form'

let CreateTaskRedux = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        {/* <label htmlFor="taskName">Task name</label> */}
        <Field name="taskName" component="input" type="text" />
      </div>
      <div>
        {/* <label htmlFor="description">Description</label> */}
        <Field name="description" component="input" type="text" />
      </div>
      <button type="submit">Create Task</button>
    </form>
  )
}

CreateTaskRedux = reduxForm({
  form: 'create'
})(CreateTaskRedux)

export default CreateTaskRedux;