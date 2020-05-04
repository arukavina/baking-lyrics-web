import {
  reduxForm,
  formValueSelector,
  change,
} from 'redux-form'
import { connect } from 'react-redux'
import SeedData from './SeedData'
import { generateSong } from "../../redux/modules/song/actions";

const mapStateToProps = (state) => {
  const selector = formValueSelector('wizard')
  const selectedArtist = state.artists.list.find(x => x.id === selector(state, 'artistId'))
  
  return {
    fistThreeWords: selector(state, 'fistThreeWords'),
    songTitle: selector(state, 'songTitle'),
    search: selector(state, 'search'),
    background: selectedArtist && selectedArtist.coverImg,
    generated: state.song.generatedSong,
    songId: state.song.generatedSong.lyrics ? state.song.generatedSong.id : null,
    isFetching: state.song.isFetching,
    errorMsg: state.song.errorMsg
  }
}

const mapDispatchToProps = dispatch => ({
  changeSearch: value => dispatch(change('wizard', 'search', value)),
})

const onSubmit = (values, dispatch) => {
  dispatch(generateSong(values.fistThreeWords, '100', values.artistId))
}

const formConfig = {
  onSubmit,
  form: 'wizard',
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(reduxForm(formConfig)(SeedData))
