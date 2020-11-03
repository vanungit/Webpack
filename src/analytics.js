import * as $ from 'jquery'
function createAnalitics() {
    let counter = 0
    let isDestory = false
    let Listener = ()=> counter ++

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
window.analitics = createAnalitics()