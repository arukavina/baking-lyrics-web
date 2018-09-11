import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import GeneratedSong from './GeneratedSong'

const formConfig = {
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
}
export default connect()(reduxForm(formConfig)(GeneratedSong))
