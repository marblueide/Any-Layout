import type { LowCanvasData } from '@/types/LowCode/index';
import VButton from "./VButton/index.vue"
import VPicture from "./VPicture/index.vue"

export const componentList:LowCanvasData[]= [
    {
        label:"按钮",
        component:VButton,
        events:{},
        isLock:false,
        style:{
            width:100,
            height:100,
        },
        animations:[],
        icon:"icon-tupian",
        linkage:[],
        propValue:{
            value:"按钮"
        }
    },
    {
        label:"图片",
        component:VPicture,
        events:{},
        isLock:false,
        style:{},
        icon:"icon-anniu",
        animations:[],
        linkage:[],
        propValue:{
            src:new URL("@/assets/default.webp",import.meta.url).href,
            fit:"cover"
        }
    }
]