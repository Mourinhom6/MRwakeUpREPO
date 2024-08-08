import { gettext } from 'i18n'
import { DEFAULT_THRESHOLD } from './../utils/constants'

AppSettingsPage({
  state: {
    //testKey: null,
    ThresHold: [],
    props: {},
    APIKEY: []
  },
  setState(props) {
    this.state.props = props
    if (props.settingsStorage.getItem('threshold')) {
      this.state.ThresHold = JSON.parse(props.settingsStorage.getItem('threshold'))
    } else {
      this.state.ThresHold = DEFAULT_THRESHOLD
      props.settingsStorage.setItem('threshold', JSON.stringify(DEFAULT_THRESHOLD))
    }
    console.log('threshold: ', this.state.ThresHold)
  },
  build(props) {
    this.setState(props)
    console.log("teste1");
    
  }
})