<template>
    <div class="ace-container" ref="aceRef">

    </div>
</template>
    
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import ace from "ace-builds";
import "ace-builds/src-min-noconflict/theme-one_dark";
import "ace-builds/src-min-noconflict/mode-json5";
import "ace-builds/src-min-noconflict/ext-language_tools";

const props = defineProps<{
    value:any
}>()

let editor: ace.Ace.Editor;
const aceRef = ref<HTMLElement>()

onMounted(() => {
    editor = ace.edit(aceRef.value!);
    editor.setOptions({
        wrap: true,
        fontSize: "15px",
        theme: "ace/theme/one_dark",
        mode: "ace/mode/json5",
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        tabSize: 4,
    });
    editor.setValue(JSON.stringify(props.value,null,4))
})


onMounted(() => {

})
</script>
    
<style scoped lang="scss"></style>