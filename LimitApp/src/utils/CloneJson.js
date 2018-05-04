export const cloneJson=(obj)=>JSON.parse(JSON.stringify(obj))  //深拷贝数据，但会抛弃对象的constructo,不能拷贝函数等

export const clone=(origin)=>{
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);  //只能拷贝两层的数据
}

//实现真正的深拷贝----》使用第三方库：lodash