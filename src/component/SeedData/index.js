import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import SeedData from './SeedData'

const formConfig = {
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
}
export default connect()(reduxForm(formConfig)(SeedData))
