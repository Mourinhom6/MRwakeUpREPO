Page({
    state: {
      props: {},
      dataList: 0
    },
    onInit(){
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
        //   Try to display the count number of sleep times in that day display




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
        },
        onDestroy(){
        },
    })