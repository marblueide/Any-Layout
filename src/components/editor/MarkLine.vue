<template>
  <div class="mark-line">
    <div
      class="line"
      v-for="item in lines"
      absolute
      :class="item.includes('x') ? 'xline' : 'yline'"
      bg-blue-2
      :style="getShapeStyle(lineState[item].style)"
      v-show="lineState[item].isShow"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { getShapeStyle, getComponentRotatedStyle } from "@/utils/style";
import emitter from "@/utils/mitt";
import { useLowStore } from "../../stores/useLowStore";
import { storeToRefs } from "pinia";
import { clone, cloneDeep, isNil } from "lodash-es";
import type { ComponentStyle } from "../../types/LowCode/style";
import { LabelEnum, type LowCanvasData } from "@/types";
import { appStore } from "@/stores";

const { currentComponent, lowCanvasData, currentComponentIndex } = storeToRefs(
  appStore.state
);
const { setCurrentComponentStyle } = appStore.state;

type line = "xt" | "xc" | "xb" | "yl" | "yc" | "yr";
type topLine = "xt" | "xc" | "xb";
type leftLine = Exclude<line, topLine>;

const lineState = reactive<{
  [k in line]: {
    isShow: boolean;
    style: {
      left: number;
      top: number;
    };
  };
}>({
  xt: {
    isShow: false,
    style: {
      left: 0,
      top: 0,
    },
  },
  xc: {
    isShow: false,
    style: {
      left: 0,
      top: 0,
    },
  },
  xb: {
    isShow: false,
    style: {
      left: 0,
      top: 0,
    },
  },
  yl: {
    isShow: false,
    style: {
      left: 0,
      top: 0,
    },
  },
  yc: {
    isShow: false,
    style: {
      left: 0,
      top: 0,
    },
  },
  yr: {
    isShow: false,
    style: {
      left: 0,
      top: 0,
    },
  },
});

const lines: line[] = ["xt", "xc", "xb", "yl", "yc", "yr"];
const diff = 10;
const store = useLowStore();

emitter.on("move", ({ isDown, isLeft }) => {
  showLine(isDown, isLeft);
});

emitter.on("unMove", () => {
  hideLine();
});

const hideLine = () => {
  for (let prop in lineState) {
    lineState[prop as line].isShow = false;
  }
};

const isGroup = computed(() => {
  return (
    !isNil(currentComponentIndex.value) &&
    lowCanvasData.value[currentComponentIndex.value!] != currentComponent.value
  );
});

const components = computed(() => {
  const arr: LowCanvasData[] = [];
  lowCanvasData.value.forEach((component) => {
    arr.push(component);
    if (
      Array.isArray(component.propValue) &&
      currentComponent.value?.label != LabelEnum.group
    ) {
      component.propValue.forEach((c) => {
        const cloneC = cloneDeep(c);
        cloneC.style.left += component.style.left;
        cloneC.style.top += component.style.top;
        arr.push(cloneC);
      });
    }
  });
  return arr;
});

const showLine = (isDown: boolean, isLeft: boolean) => {
  if (!currentComponent.value) return;
  const cloneCurStyle = cloneDeep(currentComponent.value?.style);
  const groupC = lowCanvasData.value[currentComponentIndex.value!];
  if (isGroup.value) {
    //判断是否是组合内的组件
    cloneCurStyle.left! += groupC.style.left!;
    cloneCurStyle.top! += groupC.style.top!;
  }
  const currentStyle = getComponentRotatedStyle(cloneCurStyle);

  const {
    left: curLeft,
    top: curTop,
    right: curRight,
    bottom: curBottom,
    width: curWidth,
    height: curHeight,
    rotate,
  } = currentStyle;
  const curHalfWidth = curWidth! / 2;
  const curHalfHeight = curHeight! / 2;

  const needShow: line[] = [];
  hideLine();
  components.value.forEach((data) => {
    if (data.id == currentComponent.value?.id) return;

    const { left, top, width, height } = getComponentRotatedStyle(
      cloneDeep(data.style)
    );
    if (
      !left ||
      !top ||
      !width ||
      !height ||
      !curBottom ||
      !curTop ||
      !curHeight ||
      !curLeft ||
      !curRight ||
      !curWidth
    ) {
      return;
    }
    const conditions: {
      [k in "top" | "left"]: {
        line: k extends "top" ? topLine : leftLine;
        isNearly: boolean;
        lineValue: number;
        curValue: number;
      }[];
    } = {
      top: [
        {
          line: "xt",
          isNearly: isNearly(top, curBottom) || isNearly(top, curTop),
          lineValue: top,
          curValue: isNearly(top, curBottom) ? top - curHeight : top,
        },
        {
          line: "xc",
          isNearly: isNearly(top + height / 2, curTop + curHalfHeight),
          lineValue: top + height / 2,
          curValue: top + height / 2 - curHalfHeight,
        },
        {
          line: "xb",
          isNearly:
            isNearly(top + height, curTop) || isNearly(top + height, curBottom),
          lineValue: top + height,
          curValue: isNearly(top + height, curTop)
            ? top + height
            : top + height - curHeight,
        },
      ],
      left: [
        {
          line: "yl",
          isNearly: isNearly(left, curLeft) || isNearly(left, curRight),
          lineValue: left,
          curValue: isNearly(left, curLeft) ? left : left - curWidth,
        },
        {
          line: "yc",
          isNearly: isNearly(left + width / 2, curLeft + curHalfWidth),
          lineValue: left + width / 2,
          curValue: left + width / 2 - curHalfWidth,
        },
        {
          line: "yr",
          isNearly:
            isNearly(left + width, curLeft) || isNearly(left + width, curRight),
          lineValue: left + width,
          curValue: isNearly(left + width, curLeft)
            ? left + width
            : left + width - curWidth,
        },
      ],
    };
    Object.keys(conditions).forEach((key) => {
      conditions[key as "top" | "left"].forEach((condition) => {
        if (condition.isNearly) {
          needShow.push(condition.line);
          lineState[condition.line].style[key as "top" | "left"] =
            condition.lineValue;
          const val = isGroup.value
            ? condition.curValue - groupC.style[key as "top" | "left"]!
            : condition.curValue;
          setCurrentComponentStyle({
            [key]:
              rotate != 0
                ? transformCurComponnet(
                    key as "top" | "left",
                    val,
                    currentStyle
                  )
                : val,
          });
        }
      });
    });
  });

  for (let prop in lineState) {
    lineState[prop as line].isShow = needShow.includes(prop as line);
  }
};

const isNearly = (target: number, cur: number) => {
  return Math.abs(target - cur) < diff;
};

const transformCurComponnet = (
  key: "top" | "left",
  value: number,
  currentStyle: Partial<ComponentStyle>
) => {
  const { height, width } = currentComponent.value!.style;
  if (key == "top") {
    return Math.round(value - (height! - currentStyle.height!) / 2);
  }
  return Math.round(value - (width! - currentStyle.width!) / 2);
};
</script>

<style scoped lang="scss">
.mark-line {
  .line {
    &.xline {
      height: 2px;
      width: 100%;
    }

    &.yline {
      width: 2px;
      height: 100%;
    }
  }
}
</style>
