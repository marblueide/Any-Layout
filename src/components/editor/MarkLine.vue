<template>
    <div class="mark-line">
        <div class="line" v-for="item in lines" absolute :class="item.includes('x') ? 'xline' : 'yline'" bg-blue-2
            :style="getShapeStyle(lineState[item].style)">
        </div>
    </div>
</template>
    
<script setup lang='ts'>
import { reactive } from 'vue';
import { getShapeStyle } from "@/utils/style"

const lineState = reactive({
    xt: {
        isShow: false,
        style: {
            left: 0,
            top: 0
        }
    },
    xc: {
        isShow: false,
        style: {
            left: 0,
            top: 0
        }
    },
    xb: {
        isShow: false,
        style: {
            left: 0,
            top: 0
        }
    },
    yl: {
        isShow: false,
        style: {
            left: 0,
            top: 0
        }
    },
    yc: {
        isShow: false,
        style: {
            left: 0,
            top: 0
        }
    },
    yr: {
        isShow: false,
        style: {
            left: 0,
            top: 0
        }
    }
})
type line = keyof typeof lineState
const lines: line[] = ['xt', 'xc', 'xb', 'yl', 'yc', 'yr']
const diff = 3;




</script>
    
<style scoped lang="scss">
.mark-line {
    height: 100%;

    .line {
        &.xline {
            height: 1px;
            width: 100%;
        }

        &.yline {
            width: 1px;
            height: 100%;
        }
    }
}
</style>