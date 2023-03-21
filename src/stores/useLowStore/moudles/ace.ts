import { defineStore } from "pinia";
import { ref } from "vue";

export const useAce = defineStore('useAce',() => {
    const aceState = ref(false)
    const hideAce = () => {
        if(!aceState.value) return
        aceState.value = false
    }
    const showAce = () => {
        if(aceState.value) return
        aceState.value = true
    }
    const triggerAce =() => {
        if(aceState.value){
            hideAce()
        }else{
            showAce()
        }
    }
    return {
        aceState,
        triggerAce,
        showAce,
        hideAce
    }
})