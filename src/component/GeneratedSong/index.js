import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import get from "lodash/get";
import { getGeneratedSong } from "../../redux/modules/song/actions";
import GeneratedSong from './GeneratedSong'

const mapStateToProps = (state) => {
  const { artistId } = state.wizard
  const selectedArtist = state.artists.list.find(x => (x.id === artistId || x.id === get(state, 'song.generatedSong.baseArtist.id')))

  return{
    generatedSong: state.song.generatedSong,
    background: selectedArtist ? selectedArtist.coverImg : state.song.generatedSong.coverImg
  }
}

const mapDispatchToProps = dispatch => ({
  getGeneratedSong: bindActionCreators(getGeneratedSong, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(GeneratedSong)
