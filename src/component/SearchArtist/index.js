import { 
  reduxForm,
  formValueSelector,
  change,
} from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getArtists } from "../../redux/modules/artists/actions";
import SearchArtist from './SearchArtist'

const mapStateToProps = (state) => {
  const selector = formValueSelector('wizard')
  
  return{
    search: selector(state, 'search'),
    artists: state.artists.list,
    isFetching: state.artists.isFetching
  }
}

const mapDispatchToProps = dispatch => ({
  getArtists: bindActionCreators(getArtists, dispatch),
  changeSearch: (value, artistId) => {
    dispatch(change('wizard', 'search', value))
    dispatch(change('wizard', 'artistId', artistId))
  }
})

const formConfig = {
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm(formConfig)(SearchArtist))
