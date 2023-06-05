const eventBus = {
    listeners: {},
    subscribe: function (eventName:String, listener:any) {
        // @ts-ignore
        if (!this.listeners[eventName]) {
            // @ts-ignore
            this.listeners[eventName] = [];
        }
        // @ts-ignore
        this.listeners[eventName].push(listener);
    },
    unsubscribe: function (eventName:String, listener:any) {
        // @ts-ignore
        if (!this.listeners[eventName]) {
            return;
        }
        // @ts-ignore
        const index = this.listeners[eventName].indexOf(listener);
        if (index !== -1) {
            // @ts-ignore
            this.listeners[eventName].splice(index, 1);
        }
    },
    emit: function (eventName:String, data:any) {
        // @ts-ignore
        if (!this.listeners[eventName]) {
            return;
        }
        // @ts-ignore
        this.listeners[eventName].forEach((listener) => {
            listener(data);
        });
    },
};

export default eventBus;