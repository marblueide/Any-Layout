<template>
  <div>
    <div
      class="search-wrapper"
      inline-block
      hover="bg-gray-1"
      h="38px"
      inline-flex
      items-center
      rounded-1
      px-3
    >
      <i class="iconfont icon-sousuo"></i>
      <input
        type="text"
        placeholder="搜索页面"
        border-none
        py-0
        px="8px"
        outline-none
        bg-transparent
      />
    </div>
  </div>
  <div class="user-list" flex justify-between items-center my-1>
    <div class="left">
      <h2 font-500>{{ user.username }}'s apps</h2>
    </div>
    <div class="right">
      <button
        cursor-pointer
        border-none
        px-3
        hover="bg-#1f9181"
        py-2
        font-600
        outline-none
        color-white
        bg="#2CBBA6"
        @click="handleAdd"
      >
        <i class="iconfont icon-jiahao"></i> 创建页面
      </button>
    </div>
  </div>
  <div class="cards" p-3 v-if="list.length > 0">
    <div class="card" w="213px" v-for="item in list">
      <div class="item" flex items-center h="109px" box-border relative>
        <h3 font-500>{{ item.pageName }}</h3>
        <div class="btns" absolute flex justify-around w="100%" left="0">
          <button
            cursor-pointer
            px-3
            hover="bg-#1f9181 border-#1f9181 border-2"
            py-2
            border="1 #2CBBA6"
            font-600
            outline-none
            color-white
            bg="#2CBBA6"
            w="80px"
            box-border
            @click="handleEditor(item)"
          >
            编辑
          </button>
          <button
            cursor-pointer
            px-3
            hover="bg-transparent color-black border-#000 border-2"
            border="1 #000"
            py-2
            font-600
            outline-none
            color-white
            bg="#000"
            w="80px"
            box-border
            @click="handlePreview(item)"
          >
            访问
          </button>
        </div>
      </div>
      <div class="info" grid mt-1>
        <div class="user" overflow-hidden text-ellipsis>
          {{ item.user.username }}'s apps
        </div>
        <div class="time">编辑于{{ handleTime(item.updateTime) }}前</div>
      </div>
    </div>
  </div>

  <el-dialog v-model="addDialog" :title="!isEditor ? '新增' : '编辑'">
    <el-form :model="form" label-position="left" ref="ruleFormRef" :validate-on-rule-change="false">
      <el-form-item
        label="页面名称"
        required
        prop="page_name"
        error="请填写页面名称"
      >
        <el-input v-model="form.page_name"></el-input>
      </el-form-item>
      <el-form-item label="描述信息" prop="describe">
        <el-input type="textarea" :rows="5" v-model="form.describe"></el-input>
      </el-form-item>
      <el-form-item class="el-form-item-end">
        <el-button type="danger" @click="setDialog(false)">取消</el-button>
        <el-button @click="reset(ruleFormRef)">重置</el-button>
        <el-button type="primary" @click="handleConfirm(ruleFormRef)"
          >确定</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { getPageList, createPage, updatePage } from "@/api";
import type { Page } from "@/types/model/Page";
import { ElMessage, type FormInstance } from "element-plus";
import { update } from "lodash-es";
import { nextTick, reactive, ref, watch, watchEffect } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
// 引入中文语言包
import "dayjs/locale/zh-cn";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { appStore } from "@/stores";
// 设置语言为中文
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

const router = useRouter();
const addDialog = ref(false);
const isEditor = ref(false);
const { user } = storeToRefs(appStore.user);
const form = ref({
  id: user.value.id,
  page_name: "",
  describe: "",
});
const paginated = reactive({
  page: 1,
  limit: 10,
});
const list = ref<Page[]>([]);
const ruleFormRef = ref<FormInstance>();

const setDialog = async (b: boolean) => {
  addDialog.value = b;
  if (b == false) {
    reset(ruleFormRef.value);
  } 
};

const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  form.value = {
    id: "1",
    page_name: "",
    describe: "",
  };
};

const handleAdd = () => {
  isEditor.value = false;
  addDialog.value = true;
};

const init = async () => {
  const res = await getPageList(paginated.page, paginated.limit);
  list.value = res.data;
};

const handleConfirm = async (formEl: FormInstance | undefined) => {
  console.log(1111111)
  if (!formEl) return;
  const { page_name, describe, id } = form.value;
  let res;
  if (isEditor.value) {
    //更新
    res = await updatePage({
      pageName: page_name,
      id,
      describe,
    });
    setDialog(false);
  } else {
    //创建
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        res = await createPage(id, page_name, describe);
        await init();
        ElMessage({
          type: "success",
          message: res?.message ?? "创建成功",
        });
        setDialog(false);
      }
    });
  }
};

const handleTime = (time: string) => {
  const start = dayjs(time);
  return start.fromNow(true);
};

const handleEditor = (item: Page) => {
  router.push({
    path: `/workArea/${item.id}`,
  });
};

const handlePreview = (item: Page) => {
  router.push({
    path:`/preview/${item.id}`
  })
}

init();
</script>

<style scoped lang="scss">
.search-wrapper {
  input {
    font-size: 0.8rem;
  }
}

.right {
  button {
    font-size: 0.8rem;
  }
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, 213px);
  gap: 30px;
  .card {
    .item {
      background-color: rgb(255, 255, 255);
      padding: 16px;
      border: 2px solid rgb(245, 209, 209);
      border-radius: 6px;
      background-image: repeating-radial-gradient(
          circle at 0px 0px,
          rgba(0, 0, 0, 0) 0px,
          rgb(255, 255, 255) 12px
        ),
        repeating-linear-gradient(
          rgba(245, 209, 209, 0.067),
          rgba(245, 209, 209, 0.4)
        );
      .btns {
        display: none;
        font-size: 0.8rem;
        filter: blur(0px) !important;
      }
      &::before {
        content: "";
        /* 设置伪元素尺寸和背景图片 */
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-image: repeating-radial-gradient(
            circle at 0px 0px,
            rgba(0, 0, 0, 0) 0px,
            rgb(255, 255, 255) 12px
          ),
          repeating-linear-gradient(
            rgba(245, 209, 209, 0.067),
            rgba(245, 209, 209, 0.4)
          );
        /* 设置高斯模糊半径 */
        filter: blur(10px);
        /* 缩小图像以增加模糊程度 */
        transform: scale(1.1);
        /* 设定z-index使其位于背景下方 */
        z-index: -1;
      }
      &:hover {
        .btns {
          display: flex;
        }
      }
    }
    .info {
      grid-template-columns: 1fr auto;
      gap: 0 10px;
      color: rgb(138, 138, 138);
      font-size: 0.8rem;
      .user {
        white-space: nowrap;
      }
    }
  }
}

.el-form-item-end {
  :deep(.el-form-item__content) {
    justify-content: end;
  }
}
</style>
