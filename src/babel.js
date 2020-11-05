async function start(){
    return await Promise.resolve("resolve")
}
start().then(console.log)
class Ult {
    static id = Date.now()
}
console.log('Util id:', Ult.id)