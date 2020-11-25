type Func = (...args: any) => any;
type Context = any;

class Observers {
    observerList: Func[] = [];

    add = (func: Func): void => {
        this.observerList.push(func);
    };

    notify = (context: Context): void => {
        this.observerList.forEach(func => func(context));
    };
}

export default Observers;
