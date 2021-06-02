
import cuid from 'cuid'

interface Timer{
    time: number 
    active: Boolean 
}
interface Subscription {
    [key: string]: Subscriber 
}
interface Subscriber{
    [key:string] : Timer 
}
class CustomEventBus {
   constructor(){ }
    subscriptions: Subscription = {}
    is_published:Boolean = false
    subscribe(event: string){
         const id = cuid()
        if(!this.subscriptions[event]) 
            this.subscriptions[event] = { }
            
        this.subscriptions[event][id] = {
            time: 10,
            active :false
        }
        // console.log(subscriptions[event]);
        return {
            unsubscribe: () => {
                delete this.subscriptions[event][id];
                if (Object.getOwnPropertySymbols(this.subscriptions[event]).length === 0) {
                  delete this.subscriptions[event][id];
                } 
            },
            start: () =>{
                this.subscriptions[event][id].active = true;
                if(this.is_published) return 
                this.is_published = true;
                let subscribers = Object.getOwnPropertyNames(this.subscriptions[event])
                let countdown = setInterval(() => {
                    let timeout = subscribers.every(e => this.subscriptions[event][e].time  === 0)
                    if(timeout) return clearInterval(countdown)
                    subscribers.map(e => {
                        if(this.subscriptions[event][e].active && this.subscriptions[event][e].time > 0){
                            this.subscriptions[event][e].time = this.subscriptions[event][e].time - 1
                        }
                        if(this.subscriptions[event][e].time == 0){
                            this.subscriptions[event][e].active = false; 
                        }
                    })
                    console.clear()
                    console.table(this.subscriptions[event])
                },1000)
                 
                        
            },
            pause: () =>{
                this.subscriptions[event][id].active = false; 
            }
        }
    }
   

    // triggered (){
    //     if(!this.subscriptions[event] || this.is_published) return 
    //     this.is_published = true;
    //     let subscribers = Object.getOwnPropertyNames(this.subscriptions[event])
    //     let countdown = setInterval(() => {
    //         let timeout = subscribers.every(e => this.subscriptions[event][e].time  === 0)
    //         if(timeout) return clearInterval(countdown)
    //         subscribers.map(e => {
    //             if(this.subscriptions[event][e].active){
    //                 this.subscriptions[event][e].time = this.subscriptions[event][e].time - 1
    //             }
    //         })
    //         console.table(this.subscriptions[event])
          
    //     },1000)
    // }
}

export default CustomEventBus