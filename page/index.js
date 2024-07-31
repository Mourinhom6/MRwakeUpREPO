// import { DEFAULT_THRESHOLD } from './../utils/constants'
import { gettext } from 'i18n';
// import { readFileSync, writeFileSync } from './../utils/fs'
const WAKE_UP_INTERVAL_SECONDS = 60 // this value must be higher than the screen on time on app
const POLL_ALARM_PREF_ID = 'my_bluetooth_poll_alarm'
const APP_ID = 1047938 // Define the appID
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
const TEXT_SIZE = 34
var counterValue = 0
var isAlarmToSet;

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = hmSetting.getDeviceInfo();
const logger = DeviceRuntimeCore.HmLogger.getLogger("Mr_WakeUp");
const { messageBuilder } = getApp()._options.globalData;
Page({
    state: {
      props: {},
      dataList: 0
    },
    onInit(){
      this.onMessage() // Starts the message listener
      this.getThresHold() // will get trshhold when changed from the phone
    },
    build() {
        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 40,
            w: DEVICE_WIDTH,
            h: 40,
            color: 0xffffff,
            text_size: TEXT_SIZE,
            align_h: hmUI.align.CENTER_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: gettext("You have")
          })
          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 80,
            w: DEVICE_WIDTH,
            h: 40,
            color: 0xffffff,
            text_size: TEXT_SIZE,
            align_h: hmUI.align.CENTER_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: gettext("fallen asleep")
          })
          hmUI.createWidget(hmUI.widget.TEXT, { //   Try to display the count number of sleep times in that day display
            x: 0,
            y: 120,
            w: DEVICE_WIDTH,
            h: 40,
            color: 0xffffff,
            text_size: TEXT_SIZE,
            align_h: hmUI.align.CENTER_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: //(GET the sleep day conter)
            //must have something like if1=time else times
          })




          hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 160,
            w: DEVICE_WIDTH,
            h: 40,
            color: 0xffffff,
            text_size: TEXT_SIZE,
            align_h: hmUI.align.CENTER_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: gettext("today")
          })
      
          hmUI.createWidget(hmUI.widget.IMG, {
            x: 0,
            y: 230,
            w: DEVICE_WIDTH,
            h: 8,
            pos_x: 0,
            pos_y: 0,
            src: 'graphic.png',
          })

    console.log("TIMES YOU GOT AWAKE")
    hmUI.createWidget(hmUI.widget.IMG, {
      x: 11+21.5*(
      (hmFS.SysProGetInt('SleepyDayCounter') >= 0
      && 
      hmFS.SysProGetInt('SleepyDayCounter') <= 3)?0:
      (hmFS.SysProGetInt('SleepyDayCounter') <= 7)?1:
      (hmFS.SysProGetInt('SleepyDayCounter') <= 11)?2:
      (hmFS.SysProGetInt('SleepyDayCounter') <= 15)?3:
      (hmFS.SysProGetInt('SleepyDayCounter') <= 19)?4:
      (hmFS.SysProGetInt('SleepyDayCounter') <= 23)?5:
      (hmFS.SysProGetInt('SleepyDayCounter') <= 27)?6:7),
      y: 218,
      w: 24,
      h: 24,
      pos_x: 0,
      pos_y: 0,
      src: 'arrowDown.png'
    })

    hmUI.createWidget(hmUI.widget.TEXT, {
      x: 0,
      y: 240,
      w: DEVICE_WIDTH,
      h: 40,
      color: 0xffffff,
      text_size: 25,
      align_h: hmUI.align.CENTER_H,
      align_v: hmUI.align.CENTER_V,
      text_style: hmUI.text_style.NONE,
      text: (
        (hmFS.SysProGetInt('SleepyDayCounter') >= 0 
        && 
        hmFS.SysProGetInt('SleepyDayCounter') <= 3)?gettext("Excellent Bro!"):
        (hmFS.SysProGetInt('SleepyDayCounter') <= 7)?gettext("Keep at it!"):
        (hmFS.SysProGetInt('SleepyDayCounter') <= 11)?gettext("Nice Job!"):
        (hmFS.SysProGetInt('SleepyDayCounter') <= 15)?gettext("Tired already?"):
        (hmFS.SysProGetInt('SleepyDayCounter') <= 19)?gettext("Need a coffee?"):
        (hmFS.SysProGetInt('SleepyDayCounter') <= 23)?gettext("Too much?"):
        (hmFS.SysProGetInt('SleepyDayCounter') <= 27)?gettext("You're losing it..."):gettext("You're wasted")
      )
    })
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: 0,
      y: 300,
      w: DEVICE_WIDTH/2,
      h: 60,
      normal_src: 'infobtn.png',
      press_src: 'infobtn.png',
      click_func: () => {
        console.log("Info button clicked");
        hmApp.gotoPage({
          file: 'page/info'
        });
      },
    })
    console.log("TEST BUILD")
    hmUI.createWidget(hmUI.widget.BUTTON, {
      x: DEVICE_WIDTH/2,
      y: 300,
      w: DEVICE_WIDTH/2,
      h: 60,
      normal_src: 'settingsbtn.png',
      press_src: 'settingsbtn.png',
      click_func: () => {
        console.log("Settings button clicked");
        hmApp.gotoPage({
          file: 'page/settings'
        });
      },
    })
    // END // APP FRONT-END
        },
        onDestroy(){
          console.log("TEST ONDESTROY")
    logger.log('app onDestroy invoked');
    // writeFileSync(this.state.dataList, false)

  },
        fetchData(packet) {
          messageBuilder.request({
              method: "GET_DATA",
              params: {
                packet: packet
              }
          }).then((data) => {
            logger.log("receive data");
            const { result } = data;
            const text = JSON.parse(result);
          });
        },
        onMessage() {
          messageBuilder.on('call', ({ payload: buf }) => {
            const data = JSON.parse(messageBuilder.buf2Json(buf))
            // const dataList = data.map((i) => ({ name: i }))
            logger.log('call dataList', data)
            this.state.dataList = data
            hmFS.SysProSetInt("HEART_THRESHOLD", this.state.dataList)
          })
        },
         // GETS THE THRESHOLD FROM SETTINGS
        getThresHold() {
          messageBuilder
            .request({
              method: 'GET_THRESHOLD'
            })
            .then(({ result }) => {
              this.state.dataList = JSON.parse(result);
              logger.log('GET_THRESHOLD dataList', this.state.dataList)
              hmFS.SysProSetInt("HEART_THRESHOLD", this.state.dataList)
            })
            .catch((res) => {})
        },
    })