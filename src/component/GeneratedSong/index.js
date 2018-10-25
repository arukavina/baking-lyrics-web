import { reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { getGeneratedSong } from "../../redux/modules/song/actions";
import GeneratedSong from './GeneratedSong'
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  const selector = formValueSelector('wizard')
  const selectedArtist = state.artists.list.find(x => x.id === selector(state, 'artistId'))

  console.log(selectedArtist)

  return{
    generatedSong: state.song.generatedSong,
    background: selectedArtist && selectedArtist.coverImg
  }
}

const mapDispatchToProps = dispatch => ({
  getGeneratedSong: bindActionCreators(getGeneratedSong, dispatch),
})

const formConfig = {
  form: 'wizard',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
}
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(formConfig)(GeneratedSong))
