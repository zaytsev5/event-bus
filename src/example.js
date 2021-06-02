
const { EventBus, CustomEventBus} = require('./EventBuss.js')


// import { CustomEventBus } from './EventBuss.js'

// const eventBus = new EventBus()
// const subGretting = eventBus.subscribe('greeting', arg => console.log(arg))
// const subLunch = eventBus.subscribe('lunch', arg => console.log(arg))
// subLunch.unsubscribe()

// eventBus.publish('greeting','Hello im Hai gain')
// eventBus.publish('greeting','Sorry, i am the first one')
// this aint gonna log this text because we ubsubscribe in line 7
// eventBus.publish('lunch','time for lunch guys !')

 const customEvent = new CustomEventBus()

let a = customEvent.subscribe('timer')
let b = customEvent.subscribe('timer')
let c = customEvent.subscribe('timer')
a.start()
c.start()

// customEvent.triggered('timer')
