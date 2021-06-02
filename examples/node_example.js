const { EventBus, EventBusSingleton } = require('../build/light-event-bus')

const eventBus = new EventBus()
eventBus.subscribe("event", arg => console.log(arg))
eventBus.subscribe("event", arg => console.log(`Hello, im again`))
eventBus.publish("event", "message")

EventBusSingleton.subscribe("event", arg => console.log(arg))
EventBusSingleton.publish("event", "message to singleton")