import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import SearchArtist from './SearchArtist'

const formConfig = {
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
}
export default connect()(reduxForm(formConfig)(SearchArtist))
