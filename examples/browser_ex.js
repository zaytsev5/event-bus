// let random = Math.random(1,100)
const CustomEventBus = function(){
    const subscriptions = { }
    let is_published = false
    this.subscribe = function sc(event){
        const id = new Date().getTime() + Math.random(1,10000)

        if(!subscriptions[event]) subscriptions[event] = { }
        subscriptions[event][id] = {
            time: 6,
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
                    if(timeout) {
                     
                        return clearInterval(countdown)
                    }
                    subscribers.map(e => {
                        if(subscriptions[event][e].active && subscriptions[event][e].time > 0){
                            subscriptions[event][e].time = subscriptions[event][e].time - 1
                        }
                        if(subscriptions[event][e].time == 0){
                            // setState(subscriptions[event])
                            subscriptions[event][e].active = false; 
                        }
                    })
                    setState(subscriptions[event])
                    // console.table(subscriptions[event])
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

const timers = document.querySelectorAll('.timer')
const event = new CustomEventBus()

timers.forEach(e => {

   let a = event.subscribe('timer')
    e.querySelector('#trigger').addEventListener('click',() => {
      
        console.log('clicked');
        a.start()
    })
})
function setState(state ={}){
    let subscribers = Object.getOwnPropertyNames(state)
    // console.log(state);
    timers.forEach((e ,i) => {
        let show_time = e.querySelector('.time-countdown')
        if(state[subscribers[i]].active ||  state[subscribers[i]].time == 0)
            show_time.textContent = state[subscribers[i]].time
        
        
    })
    
}