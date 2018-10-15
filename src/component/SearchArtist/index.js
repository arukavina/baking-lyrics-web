import { 
  reduxForm,
  formValueSelector,
  change,
} from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getArtists } from "../../redux/modules/artists/actions";
// import getColumnsFromData from "../../redux/selectors/getColumns";
import SearchArtist from './SearchArtist'

const mapStateToProps = (state) => {
  const selector = formValueSelector('wizard')
  // const artistsWithImg = getColumnsFromData(state)
  // console.log(artistsWithImg);
  
  return{
    search: selector(state, 'search'),
    artists: state.artists.list,
    // artistsWithImg,
  }
}

const mapDispatchToProps = dispatch => ({
  getArtists: bindActionCreators(getArtists, dispatch),
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
)(reduxForm(formConfig)(SearchArtist))
