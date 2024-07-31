const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } =
  hmSetting.getDeviceInfo();

Page({
    onInit(param) {
    },


    build() {
      console.log("BUILD:")
      //first get info
      const time = hmSensor.createSensor(hmSensor.id.TIME);
      var now = new Date(time.year, time.month, time.day, time.hour, time.minute);
      var startDate = new Date(time.year, time.month, time.day, hmFS.SysProGetInt('StartHour'), hmFS.SysProGetInt('StartMinute'));
      var finishDate = new Date(time.year, time.month, time.day, hmFS.SysProGetInt('FinishHour'), hmFS.SysProGetInt('FinishMinute'));
      if (hmFS.SysProGetInt('AlarmSet') == 1){}





      




      //seconde verify and test info

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
    } else {
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
  