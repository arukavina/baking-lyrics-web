import { connect } from 'react-redux'
import SeedData from './SeedData'
import { generateSong } from "../../redux/modules/song/actions";
import { changeField, resetWizard } from "../../redux/modules/wizard/slice";

const mapStateToProps = (state) => {
  const { artistId, search, fistThreeWords, termsAndConditions } = state.wizard
  const selectedArtist = state.artists.list.find(x => x.id === artistId)

  return {
    artistId,
    fistThreeWords,
    termsAndConditions,
    search,
    background: selectedArtist && selectedArtist.coverImg,
    generated: state.song.generatedSong,
    songId: state.song.generatedSong.lyrics ? state.song.generatedSong.id : null,
    isFetching: state.song.isFetching,
    errorMsg: state.song.errorMsg
  }
}

const mapDispatchToProps = dispatch => ({
  changeField: (field, value) => dispatch(changeField({ field, value })),
  resetWizard: () => dispatch(resetWizard()),
  generateSong: (seed, numberWords, artistId) => dispatch(generateSong(seed, numberWords, artistId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SeedData)
