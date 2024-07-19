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
    }
})
