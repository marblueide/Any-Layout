export default class PubSub<
  T extends keyType
> {
  public events: Map<T,((...args:any[]) => any)[]>;
  constructor() {
    this.events = new Map()
  }

  subscribe(type: T, cb: (...args:any[]) => any) {
    let cbs = this.events.get(type)
    if(cbs){
        cbs.push(cb)
        return
    }
    this.events.set(type,[cb])
  }

  notify(type:T,...args:any[]){
    return new Promise<void>(async (resolve,reject) => {
        const fns = this.events.get(type)
        if(!fns) return resolve()
        for await(const fn of fns){
            try {
                await fn(...args)
            } catch (error) {
                reject(error)
            }
        }
        resolve()
    })
    
  }
}

type keyType = string | number | symbol;
