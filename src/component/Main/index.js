import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Main from './Main'

const formConfig = {
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
}
export default connect()(reduxForm(formConfig)(Main))
