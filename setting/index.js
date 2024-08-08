import { gettext } from 'i18n'
import { DEFAULT_THRESHOLD } from './../utils/constants'

AppSettingsPage({
  state: {
    //testKey: null,
    ThresHold: [],
    props: {},
    APIKEY: []
  },
  editThresHold(val) {
    console.log('val2: ',val)
    this.state.ThresHold[0] = val
    console.log('val3: ',val)
    const newIntv = val
    this.state.props.settingsStorage.setItem('threshold', newIntv)
    console.log('newIntv: ',newIntv)
  },
  editAPIKEY(vul) {
    this.state.APIKEY[0] = vul
    this.state.props.settingsStorage.setItem('APIKEY', vul)
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
    console.log(props.settingsStorage.getItem('threshold'), typeof(props.settingsStorage.getItem('threshold')))
    return Section({
      style:{
        width:'100vw',
        height:'100vh',
        background:'black',
        color:'white',
      }
    },[
    TextInput({
        label: gettext("New Threshold"),
        placeholder:'60',
        bold:true,
        //settingsKey:'threshold',
        value: this.state.ThresHold,
        onChange:(val) => {
          if (val >= 30 && val <= 100) {
            console.log('val: ',val)
            this.editThresHold(val)
          } else {
            console.log("threshold can't have those values!")
          }
        },
        labelStyle:{
          fontSize: '30px',
          borderRadius: '30px',
          background: '#1013E4',
          color: 'white',
          width: '80%',
          textAlign: 'center',
          margin: 'auto',
          marginTop: '20px'
        },
        subStyle:{
          fontSize: '12px',
          lineHeight: '30px',
          borderRadius: '30px',
          background: '#409EFF',
          color: 'white',
          textAlign: 'center',
          // padding: '0 15px',
          width: '80%',
          margin: 'auto',
          marginTop: '20px'
        }
      }),
      TextInput({
        label: gettext("New API Code"),
        placeholder:'xxxxxxxxx',
        bold:true,
        //settingsKey:'threshold',
        value: this.state.APIKEY,
        onChange:(vul) => {
          console.log('vul: ',vul)
          this.editAPIKEY(vul)
        },
        labelStyle:{
          fontSize: '30px',
          borderRadius: '30px',
          background: '#1013E4',
          color: 'white',
          width: '80%',
          textAlign: 'center',
          margin: 'auto',
          marginTop: '20px'
        },
        subStyle:{
          fontSize: '12px',
          lineHeight: '30px',
          borderRadius: '30px',
          background: '#409EFF',
          color: 'white',
          textAlign: 'center',
          // padding: '0 15px',
          width: '80%',
          margin: 'auto',
          marginTop: '20px'
        }
      })
    ])   
  }
})