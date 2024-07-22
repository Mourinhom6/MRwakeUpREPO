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
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 130,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("compares it")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 160,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("to previous")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 190,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("measurements")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 220,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("and analyses it,")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 250,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("in order to find")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 280,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("out if you are")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 310,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("awake or not. If")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 340,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("you fall asleep,")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 370,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("Mr WakeUp will")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 400,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("wake you up by")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 430,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("vibrating and")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 460,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("sending a")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 490,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("notification to")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 520,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("your mobile")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 550,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("app, as well as")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 580,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("keeping track")
        })
        hmUI.createWidget(hmUI.widget.TEXT, {
          x: 0,
          y: 610,
          w: DEVICE_WIDTH,
          h: 40,
          color: 0xffffff,
          text_size: TEXT_SIZE,
          align_h: hmUI.align.LEFT_H,
          align_v: hmUI.align.CENTER_V,
          text_style: hmUI.text_style.NONE,
          text: gettext("of every time")
        })
    }
})