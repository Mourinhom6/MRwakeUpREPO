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
      // SETS THE AlarmSet VARIABLE
      console.log(hmFS.SysProGetInt('AlarmSet'))
      if(hmFS.SysProGetInt('AlarmSet') != 1 && hmFS.SysProGetInt('AlarmSet') != -1){
        console.log("TRYING TO SET VARIABLE... 0 FOR SUCCESS:", hmFS.SysProSetInt('AlarmSet', -1));
      }
      //SETS THE TIME VARIABLES
      console.log(hmFS.SysProGetInt("FinishHour"))
      if(hmFS.SysProGetInt("FinishHour") == undefined && hmFS.SysProGetInt("FinishMinute") && undefined && hmFS.SysProGetInt("StartHour") == undefined && hmFS.SysProGetInt("StartMinute") == undefined && hmFS.SysProGetInt("Mode") == undefined){
        console.log("SAVED THE FINISH HOUR?",hmFS.SysProSetInt('FinishHour', 23));
        console.log("SAVED THE FINISH MINUTE? ",hmFS.SysProSetInt('FinishMinute', 59));
        console.log("SAVED THE START HOUR?",hmFS.SysProSetInt('StartHour',0));
        console.log("SAVED THE START MINUTE?",hmFS.SysProSetInt('StartMinute',0));
        console.log("SAVED THE MODE?", hmFS.SysProSetInt('Mode', 1));
      }


      const time = hmSensor.createSensor(hmSensor.id.TIME)
      if (hmFS.SysProGetInt("SleepyCurrentDay") == undefined && hmFS.SysProGetInt("SleepyCurrentMonth") == undefined && hmFS.SysProGetInt("SleepyCurrentYear") == undefined && hmFS.SysProGetInt("SleepyDayCounter") == undefined) {
        // DATE NOT DEFINED?
        
        const time = hmSensor.createSensor(hmSensor.id.TIME)
        console.log("SAVED THE CURRENT DAY?",hmFS.SysProSetInt('SleepyCurrentDay', 1));
        console.log("SAVED THE CURRENT MONTH?",hmFS.SysProSetInt('SleepyCurrentMonth', 1));
        console.log("SAVED THE CURRENT YEAR?",hmFS.SysProSetInt('SleepyCurrentYear', 1900));
        console.log("SAVED THE SLEEPY DAY COUNTER?",hmFS.SysProSetInt('SleepyDayCounter', 0));
      } else if (hmFS.SysProGetInt('SleepyCurrentYear') != time.year || hmFS.SysProGetInt('SleepyCurrentMonth') != time.month || hmFS.SysProGetInt('SleepyCurrentDay') != time.day){
        // DATE CHANGES?

        // START // SEND YESTERDAY'S VALUES TO THE WEBSITE
        console.log("INFO: SENDING COUNTER VALUE TO SIDE SERVICE")
        packet = JSON.stringify({
          noTimesWakeUp: hmFS.SysProGetInt('SleepyDayCounter'),
          day: hmFS.SysProGetInt('SleepyCurrentDay'),
          month: hmFS.SysProGetInt('SleepyCurrentMonth'),
          year: hmFS.SysProGetInt('SleepyCurrentYear')
        })
        this.fetchData(packet);
        counterValue = hmFS.SysProGetInt('SleepyDayCounter');
        hmBle.createConnect(function (index, data) {
          hmBle.send(packet, packet.length); //supostamente como é int n é preciso o counterValue.length
        });
        hmBle.disConnect();
        console.log(hmBle.connectStatus())  // Print Bluetooth connection status
        hmBle.addListener(function (status) { // Add listener for Bluetooth connection status
          console.log(status)
        })
        // END // SEND YESTERDAY'S VALUES TO THE WEBSITE

        // START // RESET YESTERDAY'S COUNTERS TO USE TODAY
        console.log("INFO: NEW SLEEP DAY - RESETTING COUNTER")
        console.log(hmFS.SysProGetInt('SleepyCurrentDay'), hmFS.SysProGetInt('SleepyCurrentMonth'), hmFS.SysProGetInt('SleepyCurrentYear'))
        console.log(time.day, time.month, time.year)
        console.log(hmFS.SysProGetInt('SleepyCurrentYear') == time.year, hmFS.SysProGetInt('SleepyCurrentMonth') == time.month, hmFS.SysProGetInt('SleepyCurrentDay') == time.day);
        hmFS.SysProSetInt('SleepyCurrentDay', time.day)
        hmFS.SysProSetInt('SleepyCurrentMonth', time.month)
        hmFS.SysProSetInt('SleepyCurrentYear', time.year)
        hmFS.SysProSetInt('SleepyDayCounter', 0)
        // END // RESET YESTERDAY'S COUNTERS TO USE TODAY
      }


      // START // SET NEW ALARM TO AVOID alarm trigger while using the app
      console.log(hmFS.SysProGetInt('AlarmSet'))
      const existingAlarm = hmFS.SysProGetInt(POLL_ALARM_PREF_ID) // get existing alarm reference from system preferences
        if(existingAlarm) {
          // cancel existing alarm
          hmApp.alarmCancel(existingAlarm)
          isAlarmToSet = true;
        }
      console.log("CONNCHECK INIT:")
      // always create a new alarm to avoid alarm trigger while using the app
      const alarm = hmApp.alarmNew({
        file: 'page/connCheck',
        appid: APP_ID,
        delay: WAKE_UP_INTERVAL_SECONDS,
        param: POLL_ALARM_PREF_ID
      })
      console.log("ALARM CONST CREATED")
      hmFS.SysProSetInt(POLL_ALARM_PREF_ID, alarm) // Save new alarm reference on system preferences
      console.log("ALARM CREATED:")
      // END // SET NEW ALARM TO AVOID alarm trigger while using the app
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
            text: hmFS.SysProGetInt('SleepyDayCounter')==1?hmFS.SysProGetInt('SleepyDayCounter')+" "+gettext("time"):hmFS.SysProGetInt('SleepyDayCounter')+" "+gettext("times")
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