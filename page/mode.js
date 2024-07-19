import { gettext } from 'i18n'
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } =
  hmSetting.getDeviceInfo();
const TEXT_SIZE = 27;
const TEXT_SIZE_2 = 18;

Page({
    build(){
        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 53,
            w: DEVICE_WIDTH*(2/3),
            h: 30,
            color: 0xffffff,
            text_size: TEXT_SIZE,
            align_h: hmUI.align.LEFT_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: gettext("Grind")
        })

        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 80,
            w: DEVICE_WIDTH*(2/3),
            h: 25,
            color: 0xb2b2b2,
            text_size: TEXT_SIZE_2,
            align_h: hmUI.align.LEFT_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: gettext("All day")
        })
        
        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 115,
            w: DEVICE_WIDTH*(2/3),
            h: 40,
            color: 0xffffff,
            text_size: TEXT_SIZE,
            align_h: hmUI.align.LEFT_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: gettext("Optimus")
        })

        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 150,
            w: DEVICE_WIDTH*(2/3),
            h: 25,
            color: 0xb2b2b2,
            text_size: TEXT_SIZE_2,
            align_h: hmUI.align.LEFT_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: "6h-23h"
        })

        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 193,
            w: DEVICE_WIDTH*(2/3),
            h: 30,
            color: 0xffffff,
            text_size: TEXT_SIZE,
            align_h: hmUI.align.LEFT_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: gettext("Work")
        })

        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 220,
            w: DEVICE_WIDTH*(2/3),
            h: 25,
            color: 0xb2b2b2,
            text_size: TEXT_SIZE_2,
            align_h: hmUI.align.LEFT_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: "8h-18h"
        })

        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 263,
            w: DEVICE_WIDTH*(2/3),
            h: 30,
            color: 0xffffff,
            text_size: TEXT_SIZE,
            align_h: hmUI.align.LEFT_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: gettext("Focus")
        })

        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 0,
            y: 290,
            w: DEVICE_WIDTH*(2/3),
            h: 25,
            color: 0xb2b2b2,
            text_size: TEXT_SIZE_2,
            align_h: hmUI.align.LEFT_H,
            align_v: hmUI.align.CENTER_V,
            text_style: hmUI.text_style.NONE,
            text: gettext("Next 2 hours")
        })

        const modeGroup = hmUI.createWidget(hmUI.widget.RADIO_GROUP, {
            x: DEVICE_WIDTH*(2/3),
            y: 0,
            w: DEVICE_WIDTH*(1/3),
            h: DEVICE_HEIGHT,
            select_src: 'selected.png',
            unselect_src: 'unselected.png',
            check_func: (group, index, checked) => {
                console.log('index', index)
                console.log('checked', checked)
                if (checked) {
                    switch (index) {
                        case 0:
                            console.log("SAVED THE FINISH HOUR?",hmFS.SysProSetInt('FinishHour', 23));
                            console.log("SAVED THE FINISH MINUTE? ",hmFS.SysProSetInt('FinishMinute', 59));
                            console.log("SAVED THE START HOUR?",hmFS.SysProSetInt('StartHour',0));
                            console.log("SAVED THE START MINUTE?",hmFS.SysProSetInt('StartMinute',0));
                            console.log("SAVED THE MODE?", hmFS.SysProSetInt('Mode', 1));
                            break;
                        case 1:
                            console.log("SAVED THE FINISH HOUR?",hmFS.SysProSetInt('FinishHour', 23));
                            console.log("SAVED THE FINISH MINUTE? ",hmFS.SysProSetInt('FinishMinute', 0));
                            console.log("SAVED THE START HOUR?",hmFS.SysProSetInt('StartHour',6));
                            console.log("SAVED THE START MINUTE?",hmFS.SysProSetInt('StartMinute',0));
                            console.log("SAVED THE MODE?", hmFS.SysProSetInt('Mode', 2));
                            break;
                        case 2:
                            console.log("SAVED THE FINISH HOUR?",hmFS.SysProSetInt('FinishHour', 18));
                            console.log("SAVED THE FINISH MINUTE? ",hmFS.SysProSetInt('FinishMinute', 0));
                            console.log("SAVED THE START HOUR?",hmFS.SysProSetInt('StartHour',8));
                            console.log("SAVED THE START MINUTE?",hmFS.SysProSetInt('StartMinute',0));
                            console.log("SAVED THE MODE?", hmFS.SysProSetInt('Mode', 3));
                            break;
                        case 3:
                            const time = hmSensor.createSensor(hmSensor.id.TIME)
                            console.log("SAVED THE FINISH HOUR?",hmFS.SysProSetInt('FinishHour', time.hour+2));
                            console.log("SAVED THE FINISH MINUTE? ",hmFS.SysProSetInt('FinishMinute', time.minute));
                            console.log("SAVED THE START HOUR?",hmFS.SysProSetInt('StartHour',time.hour));
                            console.log("SAVED THE START MINUTE?",hmFS.SysProSetInt('StartMinute',0));
                            console.log("SAVED THE MODE?", hmFS.SysProSetInt('Mode', 4));
                            break;
                        default:
                            break;
                    }
                    console.log("SELECTED MODE IS", hmFS.SysProGetInt('Mode'));
                }
            }
        })
        
        const button1 = modeGroup.createWidget(hmUI.widget.STATE_BUTTON, {
            x: 0,
            y: 50,
            w: 64,
            h: 64
        })
        const button2 = modeGroup.createWidget(hmUI.widget.STATE_BUTTON, {
            x: 0,
            y: 120,
            w: 64,
            h: 64
        })
        const button3 = modeGroup.createWidget(hmUI.widget.STATE_BUTTON, {
            x: 0,
            y: 190,
            w: 64,
            h: 64
        })
        const button4 = modeGroup.createWidget(hmUI.widget.STATE_BUTTON, {
            x: 0,
            y: 260,
            w: 64,
            h: 64
        })
        mode = hmFS.SysProGetInt('Mode')
        console.log(mode)
        modeGroup.setProperty(hmUI.prop.INIT, button3);
        switch (mode) {
            case 1:
                modeGroup.setProperty(hmUI.prop.INIT, button1);
                break;
            case 2:
                modeGroup.setProperty(hmUI.prop.INIT, button2);
                break;
            case 3:
                modeGroup.setProperty(hmUI.prop.INIT, button3);
                break;
            case 4:
                modeGroup.setProperty(hmUI.prop.INIT, button4);
                break;
        }

    }
})