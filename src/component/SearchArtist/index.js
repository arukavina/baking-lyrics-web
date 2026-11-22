import { connect } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'
import { getArtists } from "../../redux/modules/artists/actions";
import { clearSong } from "../../redux/modules/song/actions";
import { changeField } from "../../redux/modules/wizard/slice";
import SearchArtist from './SearchArtist'

const mapStateToProps = (state) => ({
  search: state.wizard.search,
  artists: state.artists.list,
  total: state.artists.total,
  isFetching: state.artists.isFetching
})

const mapDispatchToProps = dispatch => ({
  getArtists: bindActionCreators(getArtists, dispatch),
  clearSong: bindActionCreators(clearSong, dispatch),
  setSearch: value => dispatch(changeField({ field: 'search', value })),
  changeSearch: (value, artistId) => {
    dispatch(changeField({ field: 'search', value }))
    dispatch(changeField({ field: 'artistId', value: artistId }))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchArtist)
