import { MessageBuilder } from "../shared/message";
import { DEFAULT_THRESHOLD } from './../utils/constants'
const messageBuilder = new MessageBuilder();

async function fetchData(ctx) {
    packetParsed = JSON.parse(packet)
    packetParsed.update({'APIKEY':settings.settingsStorage.getItem('APIKEY')})
    packet = JSON.stringify(packetParsed)
    var formData = new FormData();
    formData.append('packet', packet)
    try {
      const res = await fetch({
        url: 'https://mrwakeup.pt/api/mouro.php', //page do site MR. WakeUP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: formData
      })
      const resBody = typeof res.body === 'string' ? JSON.parse(res.body) : res.body
  
      ctx.response({
        data: { result: resBody },
      })
  
      } catch (error) {
      ctx.response({
        data: { result: "ERROR" },
      });
    }
  };
AppSideService({
    onInit() {
        messageBuilder.listen(() => {})
        // START // ON CHANGE THE SETTINGS VALUE SEND IT TO BAND
        settings.settingsStorage.addListener('change', ({ key, newValue }) => {
            console.log('func: value changed')
            messageBuilder.call(this.getThresHold())
            console.log(settings.settingsStorage.getItem('threshold'))
        });
        // END // ON CHANGE THE SETTINGS VALUE SEND IT TO BAND


    messageBuilder.on('request', (ctx) => {
        //const jsonRpc = messageBuilder.buf2Json(ctx.request.payload);
        const payload = messageBuilder.buf2Json(ctx.request.payload)
        switch (payload.method) {
            case 'GET_THRESHOLD':
                ctx.response({
                    data: { result: this.getThresHold() }
                })
                break;
            case "GET_DATA":
                return fetchData(ctx);
        }
    })
    messaging.peerSocket.addListener('message', (payload) => {
        // The Buffer here is polyfill.
        const message = JSON.parse(Buffer.from(payload))
        
        if (message.type === 'command') {
            switch (message.name) {
                case GET_THRESHOLD:
                    const notes = settings.settingsStorage.getItem('notes')
                    const noteBuffer = Buffer.from(notes)
                    messaging.peerSocket.send(noteBuffer.buffer)
                    break
            }
        }
    })
    },
  
    onRun() {
        console.log('123')
    },
    onDestroy() {
        
    },
    getThresHold() {
        console.log(settings.settingsStorage.getItem('threshold'))
        return settings.settingsStorage.getItem('threshold')
          ? JSON.stringify(settings.settingsStorage.getItem('threshold'))
          : [...DEFAULT_THRESHOLD]
      }
    })
