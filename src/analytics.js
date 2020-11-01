function createAnalitics() {
    let counter = 0
    let isDestoryed = false
    let Listener = ()=> counter ++

    document.addEventListener('click',Listener)

    return{
        destroy(){
            document.removeEventListener('click',Listener)
            isDestoryed = true
        },
        getClicks(){
            if(isDestoryed){
                return 'Analitics is destroyed'
            }
            return counter
        }
    }
}
window.analitics = createAnalitics()