const cuid = require('cuid')
// import cuid from 'cuid'


const EventBus = function(){
    const subscriptions = {}
    this.subscribe = function subscribeCallbackToEvent(event, callback){
        const id = cuid()
        if(!subscriptions[event]) subscriptions[event] = { }
        subscriptions[event][id] = callback;
        return {
            unsubscribe: function unsubscribe() {
              delete subscriptions[event][id];
              if (Object.getOwnPropertySymbols(subscriptions[event]).length === 0) {
                delete subscriptions[event];
              }
            },
          };

    }
    this.publish = function publishEventWithArgs(event , arg){
        if(!subscriptions[event]) return 
        // console.log( Object.getOwnPropertyNames(subscriptions[event]))
        Object.getOwnPropertyNames(subscriptions[event])
        .forEach(key => subscriptions[event][key](arg));
  };
    
}

const CustomEventBus = function(){
    const subscriptions = { }
    let is_published = false
    this.subscribe = function sc(event){
         const id = cuid()
        //  console.log('ok');
        if(!subscriptions[event]) subscriptions[event] = { }
        subscriptions[event][id] = {
            time: 10,
            active :false
        }
        // console.log(subscriptions[event]);
        return {
            unsubscribe: function ubsubscribe() {
                delete subscriptions[event][id];
                if (Object.getOwnPropertySymbols(subscriptions[event]).length === 0) {
                  delete subscriptions[event][id];
                } 
            },
            start: function start(){
                subscriptions[event][id].active = true;
                if(is_published) return 
                is_published = true;
                let subscribers = Object.getOwnPropertyNames(subscriptions[event])
                let countdown = setInterval(() => {
                    let timeout = subscribers.every(e => subscriptions[event][e].time  === 0)
                    if(timeout) return clearInterval(countdown)
                    subscribers.map(e => {
                        if(subscriptions[event][e].active && subscriptions[event][e].time > 0){
                            subscriptions[event][e].time = subscriptions[event][e].time - 1
                        }
                        if(subscriptions[event][e].time == 0){
                            subscriptions[event][e].active = false; 
                        }
                    })
                    console.clear()
                    console.table(subscriptions[event])
                },1000)
                 
                        
            },
            pause: function pause(){
                subscriptions[event][id].active = false; 
            }
        }
    }
   

    this.triggered = function triggered(event){
        if(!subscriptions[event] || is_published) return 
        is_published = true;
        let subscribers = Object.getOwnPropertyNames(subscriptions[event])
        let countdown = setInterval(() => {
            let timeout = subscribers.every(e => subscriptions[event][e].time  === 0)
            if(timeout) return clearInterval(countdown)
            subscribers.map(e => {
                if(subscriptions[event][e].active){
                    subscriptions[event][e].time = subscriptions[event][e].time - 1
                }
            })
            console.table(subscriptions[event])
          
        },1000)
    }
}
module.exports = { 
    CustomEventBus,
    EventBus
}

// const EventsBus = Object.freeze({
//     CustomEventBus,
//     EventBus
// })

// module.exports = EventsBus
// export { CustomEventBus, EventBus}

// export default EventsBus
// exports 
// module.exports = EventBus