class Event {
  constructor() {
    this._listener = {}
  }


  /**
   * 监听
   * @param {string} type
   * @param {function} handler
   * @memberof Event
   */
  on(type, handler) {
    if (!this._listener[type]) {
      this._listener[type] = []
    }
    
    this._listener[type].push(handler)
  }



  /**
   *触发
   *
   * @param {*} type
   * @param {*} event
   * @returns
   * @memberof Event
   */
  emit(type, event) {
    if (event == null || event.type == null) {
        return;
    }
    const typeListeners = this._listener[type]
    if (!typeListeners) return
    for (let index = 0; index < typeListeners.length; index++) {
      const handler = typeListeners[index];
      
      handler(event)
    }
  }


  /**
   * 删除
   *
   * @param {*} type
   * @param {*} handler
   * @memberof Event
   */
  remove(type, handler) {
    if(!handler) {
      this._listener[type] = []
      return
    }

    if (this._listener[type]) {
      const listeners = this._listeners[type];
      for (let i = 0, len = listeners.length; i < len; i++) {
          if (listeners[i] === listener) {
              listeners.splice(i, 1);
          }
      }
    }

  }


}

export default Event