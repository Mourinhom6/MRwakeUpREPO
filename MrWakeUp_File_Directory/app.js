import './shared/device-polyfill'
import { MessageBuilder } from './shared/message'
const appId = 1047938
const logger = DeviceRuntimeCore.HmLogger.getLogger("Mr_WakeUp");
const messageBuilder = new MessageBuilder({appId});
App({
  globalData: {
    messageBuilder: messageBuilder
  },
  onCreate() {
    logger.log('app onCreate invoked');
    // Turn On Message Builder
    messageBuilder.connect();
  },
  onDestroy() {
    logger.log('app onDestroy invoked');
    // Turn Off Message Builder
    messageBuilder.disConnect();
  }
})