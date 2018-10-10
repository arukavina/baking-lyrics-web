import {
  reduxForm,
  formValueSelector,
  change,
} from 'redux-form'
import { connect } from 'react-redux'
import SeedData from './SeedData'

const mapStateToProps = (state) => {
  const selector = formValueSelector('wizard')
  return{
    fistThreeWords: selector(state, 'fistThreeWords'),
    songTitle: selector(state, 'songTitle'),
    search: selector(state, 'search'),
  }
}

const mapDispatchToProps = dispatch => ({
  changeSearch: value => dispatch(change('wizard', 'search', value)),
})

const formConfig = {
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm(formConfig)(SeedData))
