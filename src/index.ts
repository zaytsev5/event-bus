import CustomEventBus from './CustomEventBusTS'

const eventCustom = new CustomEventBus()

let subcription = eventCustom.subscribe('timer')
let subcription1 = eventCustom.subscribe('timer')
subcription.start()
subcription1.start()

