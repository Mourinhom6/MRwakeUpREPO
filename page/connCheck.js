import { gettext } from 'i18n'
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } =
  hmSetting.getDeviceInfo();

const WAKE_UP_INTERVAL_SECONDS = 60 // this value must be higher than the screen on time on app
const POLL_ALARM_PREF_ID = 'my_bluetooth_poll_alarm'
const APP_ID = 1047938
const heart = hmSensor.createSensor(hmSensor.id.HEART)
const vibrate = hmSensor.createSensor(hmSensor.id.VIBRATE)
const TEXT_SIZE = 20
var counterValue = 0

Page({
    onInit(param) {
        console.log("CONNCHECK INIT:")
    console.log("ALARM:")
    console.log(param)
    vibrate.stop() // stop any vibration
    vibrate.scene = 5 // set the vibration scene to 27 (1000ms vibration, high intensity)

    // verify if this launch was triggered by an alarm or not
    if(param === POLL_ALARM_PREF_ID) { 
      const existingAlarm = hmFS.SysProGetInt(POLL_ALARM_PREF_ID) // get existing alarm reference from system preferences
      if(existingAlarm) {
        // cancel existing alarm
        hmApp.alarmCancel(existingAlarm)
      }
    }

    // always create a new alarm to avoid alarm trigger while using the app
    const alarm = hmApp.alarmNew({
      file: 'page/connCheck',
      appid: APP_ID,
      delay: WAKE_UP_INTERVAL_SECONDS,
      param: POLL_ALARM_PREF_ID
    })

    hmFS.SysProSetInt(POLL_ALARM_PREF_ID, alarm) // Save new alarm reference on system preferences
    console.log("ALARM CREATED:")
  },


    build() {
        console.log("BUILD:")
        //first get info
        const time = hmSensor.createSensor(hmSensor.id.TIME);
        var now = new Date(time.year, time.month, time.day, time.hour, time.minute);
        var startDate = new Date(time.year, time.month, time.day, hmFS.SysProGetInt('StartHour'), hmFS.SysProGetInt('StartMinute'));
        var finishDate = new Date(time.year, time.month, time.day, hmFS.SysProGetInt('FinishHour'), hmFS.SysProGetInt('FinishMinute'));

      //seconde verify and test info
        if (hmFS.SysProGetInt('AlarmSet') == 1){
            if (now > startDate && now < finishDate) {
                if (heart.last>hmFS.SysProGetInt("HEART_THRESHOLD")) {
                    console.log("INFO: AWAKE; THRESHOLD:", hmFS.SysProGetInt("HEART_THRESHOLD"));
                    hmApp.exit();
                } else {
                    vibrate.start()
                    if (hmFS.SysProGetInt('SleepyCurrentYear') == time.year && hmFS.SysProGetInt('SleepyCurrentMonth') == time.month && hmFS.SysProGetInt('SleepyCurrentDay') == time.day) {
                        console.log("INFO: SLEEPING WAKE UP!!! THRESHOLD:", hmFS.SysProGetInt("HEART_THRESHOLD"));
                        hmFS.SysProSetInt('SleepyDayCounter', hmFS.SysProGetInt('SleepyDayCounter')+1)
                    } else {
                        //WARNN
                        //WARNN
                        console.log("INFO: SENDING COUNTER VALUE TO SIDE SERVICE");
                        console.log("SLEEPY DAY COUNTER == COUNTER VALUE?", (SleepyDayCounter = counterValue));
                        hmBle.createConnect(function (index, data, size) {
                            hmBle.send(counterValue); //no need for size because it's a int
                        });
                        hmBle.disConnect();
                        //WARNN
                        //WARNN
                        console.log("INFO: NEW SLEEP DAY - RESETTING COUNTER")
                        console.log(hmFS.SysProGetInt('SleepyCurrentDay'), hmFS.SysProGetInt('SleepyCurrentMonth'), hmFS.SysProGetInt('SleepyCurrentYear'))
                        console.log(time.day, time.month, time.year)
                        console.log(hmFS.SysProGetInt('SleepyCurrentYear') == time.year, hmFS.SysProGetInt('SleepyCurrentMonth') == time.month, hmFS.SysProGetInt('SleepyCurrentDay') == time.day);
                        hmFS.SysProSetInt('SleepyCurrentDay', time.day)
                        hmFS.SysProSetInt('SleepyCurrentMonth', time.month)
                        hmFS.SysProSetInt('SleepyCurrentYear', time.year)
                        hmFS.SysProSetInt('SleepyDayCounter', 1)
                    }

                    //third trigger display
                    hmUI.createWidget(hmUI.widget.IMG, {
                        x: 0,
                        y: 40,
                        w: DEVICE_WIDTH,
                        h: DEVICE_WIDTH,
                        pos_x: (DEVICE_WIDTH-80)/2,
                        pos_y: 0,
                        src: 'medal.png',
                    })
                    hmUI.createWidget(hmUI.widget.TEXT, {
                        x: 0,
                        y: 110,
                        w: DEVICE_WIDTH,
                        h: 40,
                        color: 0xffffff,
                        text_size: 20,
                        align_h: hmUI.align.CENTER_H,
                        align_v: hmUI.align.CENTER_V,
                        text_style: hmUI.text_style.NONE,
                        text: hmFS.SysProGetInt('SleepyDayCounter')==1?hmFS.SysProGetInt('SleepyDayCounter')+" time today":hmFS.SysProGetInt('SleepyDayCounter')+" times today"
                    })
                    hmUI.createWidget(hmUI.widget.TEXT, {
                        x: 0,
                        y: 140,
                        w: DEVICE_WIDTH,
                        h: 40,
                        color: 0xffffff,
                        text_size: 20,
                        align_h: hmUI.align.CENTER_H,
                        align_v: hmUI.align.CENTER_V,
                        text_style: hmUI.text_style.NONE,
                        text: (time.hour<10 ? "0"+time.hour : time.hour) +":"+ (time.minute<10 ? "0"+time.minute : time.minute)
                    })
                    hmUI.createWidget(hmUI.widget.TEXT, {
                        x: 0,
                        y: 170,
                        w: DEVICE_WIDTH,
                        h: 40,
                        color: 0xffffff,
                        text_size: TEXT_SIZE,
                        align_h: hmUI.align.CENTER_H,
                        align_v: hmUI.align.CENTER_V,
                        text_style: hmUI.text_style.NONE,
                        text: gettext("Wake up Mate!")
                    })
                    hmUI.createWidget(hmUI.widget.TEXT, {
                        x: 0,
                        y: 200,
                        w: DEVICE_WIDTH,
                        h: 40,
                        color: 0xffffff,
                        text_size: TEXT_SIZE,
                        align_h: hmUI.align.CENTER_H,
                        align_v: hmUI.align.CENTER_V,
                        text_style: hmUI.text_style.NONE,
                        text: gettext("You have fallen")
                    })
                    hmUI.createWidget(hmUI.widget.TEXT, {
                        x: 0,
                        y: 230,
                        w: DEVICE_WIDTH,
                        h: 40,
                        color: 0xffffff,
                        text_size: TEXT_SIZE,
                        align_h: hmUI.align.CENTER_H,
                        align_v: hmUI.align.CENTER_V,
                        text_style: hmUI.text_style.NONE,
                        text: gettext("asleep during")
                    })
                    hmUI.createWidget(hmUI.widget.TEXT, {
                        x: 0,
                        y: 260,
                        w: DEVICE_WIDTH,
                        h: 40,
                        color: 0xffffff,
                        text_size: TEXT_SIZE,
                        align_h: hmUI.align.CENTER_H,
                        align_v: hmUI.align.CENTER_V,
                        text_style: hmUI.text_style.NONE,
                        text: gettext("the day!")
                    })
                    hmUI.createWidget(hmUI.widget.BUTTON, {
                        x: 0,
                        y: 310,
                        w: DEVICE_WIDTH,
                        h: 50,
                        radius: 25,
                        normal_color: 0x383838,
                        press_color: 0xbcbcbc,
                        text: 'OK',
                        click_func: () => {
                        hmApp.exit()
                        },
                    })
                }
            } 
            else {
            console.log("INFO: NOT IN TIME RANGE")
            console.log("Start time: " + startDate)
            console.log("Now: " + now)
            console.log("Finish time: " + finishDate)
            hmApp.exit()
            }
        } 
        else {
            console.log("INFO: NOT SWITCHED ON")
            console.log(hmFS.SysProGetInt('AlarmSet'))
            hmApp.exit()
        }
    },
    onDestroy() {
      console.log("DESTROY:")
      vibrate && vibrate.stop() // stop any vibration
    }
  })
  