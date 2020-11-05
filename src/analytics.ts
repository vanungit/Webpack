import * as $ from 'jquery'
function createAnalitics():Object {
    let counter = 0
    let isDestory:boolean = false
    let Listener = ():number=> counter ++

    $(document).on('click',Listener)

    return{
        destroy(){
            $(document).off('click',Listener)
            isDestory = true
        },
        getClicks(){
            if(isDestory){
                return 'Analitics is destroyed'
            }
            return counter
        }
    }
}
window['analitics'] = createAnalitics()