<template>
  <div ref="aceContent" w-full h-full></div>
</template>

<script setup lang="ts">
import ace from "ace-builds";
import "ace-builds/src-min-noconflict/theme-one_dark";
import "ace-builds/src-min-noconflict/mode-json5";
import "ace-builds/src-min-noconflict/ext-language_tools";
import { onMounted, ref, toRefs, watch } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps<{
  modelValue: string;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

let editor: ace.Ace.Editor;
const aceContent = ref<Element>();

window.addEventListener("resize", () => {
  editor && editor.resize();
});

watch(
  () => props.modelValue,
  (newVal) => {
    setEditorValue(newVal);
  }
);

onMounted(() => {
  editor = ace.edit(aceContent.value!, {});
  editor.setOptions({
    // 启用滚动
    autoScrollEditorIntoView: true,
    // 启用换行
    wrap: true,
    fontSize: "15px",
    theme: "ace/theme/one_dark",
    mode: "ace/mode/json5",
    enableSnippets: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    tabSize: 4,
  });
  editor.addEventListener('input', () => {
    const value = editor.getValue();
    try {
      JSON.parse(value)
    } catch (error) {
      ElMessage.warning('JSON错误');
    }
  })
  setEditorValue(props.modelValue);
});

function getValue() {
  const value = editor.getValue();
  return value;
}

function setEditorValue(value: string) {
  let json;
  try {
    json = value?.length ? JSON.stringify(JSON.parse(value), null, 4) : "";
  } catch (error) {
    json = "";
    ElMessage.error(error?.message);
  }
  editor && editor.setValue(json);
}

defineExpose({
  getValue,
});
</script>

<style scoped></style>
