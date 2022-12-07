import type { LowCanvasData } from '@/types/LowCode/index';
import { markRaw } from 'vue';
import VButton from "./VButton/index.vue"
import VPicture from "./VPicture/index.vue"

export const componentList:LowCanvasData[]= [
    {
        label:"按钮",
        component:() =>  markRaw(VButton),
        events:{},
        isLock:false,
        style:{
            width:60,
            height:32,
        },
        animations:[],
        icon:"icon-anniu",
        linkage:[],
        propValue:{
            value:"按钮"
        }
    },
    {
        label:"图片",
        component:() => markRaw(VPicture),
        events:{},
        isLock:false,
        style:{
            width:300,
            height:200
        },
        icon:"icon-tupian",
        animations:[],
        linkage:[],
        propValue:{
            src:new URL("@/assets/default.webp",import.meta.url).href,
            fit:"cover"
        }
    }
]