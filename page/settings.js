import { gettext } from 'i18n'
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } =
  hmSetting.getDeviceInfo();
const TEXT_SIZE = 30;


Page({
    build() {
        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 45,
            w: DEVICE_WIDTH/2,
            h: 57,
            color: 0xffffff,
            text_size: TEXT_SIZE,
            align_h: hmUI.align.LEFT_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: "On/Off"
        })
        console.log("STATUS BTN")
        if (hmFS.SysProGetInt('AlarmSet')==1) isStatus = true;
        else isStatus = false;
        const status_switch = hmUI.createWidget(hmUI.widget.SLIDE_SWITCH, {
          x: DEVICE_WIDTH/2,
          y: 50,
          w: 96,
          h: 57,
          select_bg: 'switchon.png',
          un_select_bg: 'switchoff.png',
          slide_src: 'radio_select.png',
          slide_select_x: 100-50-2,
          slide_un_select_x: 8,
          checked: isStatus,
          checked_change_func: (slideSwitch, checked) => {
            console.log('checked', checked)
            if (checked){
              hmFS.SysProSetInt("AlarmSet", 1);
              console.log('Alarm set')
            } else {
              hmFS.SysProSetInt("AlarmSet", -1);
              console.log('Alarm NOT set')
            }

          }
        })
        console.log("STATUS BTN CREATED")
        console.log('slide checked', status_switch.getProperty(hmUI.prop.CHECKED))
        

        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: 0,
          y: 150,
          w: DEVICE_WIDTH,
          h: 30,
          radius: 12,
          normal_color: 0x383838,
          press_color: 0xfeb4a8,
          text: 'MODE',
          click_func: () => {
            hmApp.gotoPage({
              file: 'page/mode'
            });
          },
        })
        console.log("TEST BUILD")

        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 120,
          w: DEVICE_WIDTH/2,
          h: 57,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("Mode")
        })
        hmUI.createWidget(hmUI.widget.BUTTON, {
          x: DEVICE_WIDTH-70,
          y: 120,
          w: 65,
          h: 65,
          normal_src: 'rightArrow.png',
          press_src: 'rightArrow.png',
          click_func: () => {
            console.log("Mode button clicked");
            hmApp.gotoPage({
              file: 'page/mode'
            });
          },
        })

    }
  })