import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { getGeneratedSong } from "../../redux/modules/song/actions";
import GeneratedSong from './GeneratedSong'
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => {
  return{
    generatedSong: state.song.generatedSong,
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
