import { gettext } from 'i18n'
const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } =
  hmSetting.getDeviceInfo();
const TEXT_SIZE = 27;

Page({
    build() {
        console.log("INFO START")
        hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: 40,
        w: DEVICE_WIDTH,
        h: 40,
        color: 0xffffff,
        text_size: TEXT_SIZE,
        align_h: hmUI.align.LEFT_H,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.NONE,
        text: gettext("Mr WakeUp")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: 70,
        w: DEVICE_WIDTH,
        h: 40,
        color: 0xffffff,
        text_size: TEXT_SIZE,
        align_h: hmUI.align.LEFT_H,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.NONE,
        text: gettext("measures your")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
        x: 0,
        y: 100,
        w: DEVICE_WIDTH,
        h: 40,
        color: 0xffffff,
        text_size: TEXT_SIZE,
        align_h: hmUI.align.LEFT_H,
        align_v: hmUI.align.CENTER_V,
        text_style: hmUI.text_style.NONE,
        text: gettext("heart rate," )
        })
    }
})