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
import { reactive, type StyleValue } from "vue";
import { getShapeStyle, getComponentRotatedStyle } from "@/utils/style";
import emitter from "@/utils/mitt";
import { useLowStore } from "../../stores/useLowStore";
import { storeToRefs } from "pinia";
import { cloneDeep } from "lodash-es";

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
const { currentComponent, lowCanvasData } = storeToRefs(store);

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

const showLine = (isDown: boolean, isLeft: boolean) => {
  const currentStyle = getComponentRotatedStyle(
    //@ts-ignore
    cloneDeep(currentComponent.value?.style)
  );

  //@ts-ignore
  const {
    left: curLeft,
    top: curTop,
    right: curRight,
    bottom: curBottom,
    width: curWidth,
    height: curHeight,
    rotate,
  } = currentStyle;
  //@ts-ignore
  const curHalfWidth = curWidth / 2;
  //@ts-ignore
  const curHalfHeight = curHeight / 2;

  const needShow: line[] = [];
  hideLine();
  lowCanvasData.value.forEach((data) => {
    if (data.id == currentComponent.value?.id) return;

    //@ts-ignore
    const { left, top, width, height } = getComponentRotatedStyle(
      //@ts-ignore
      cloneDeep(data.style)
    );
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
          store.setCurrentComponentStyle({
            [key]:
              rotate != 0
                ? transformCurComponnet(
                    key as "top" | "left",
                    condition.curValue,
                    currentStyle
                  )
                : condition.curValue,
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
  currentStyle: StyleValue
) => {
  //@ts-ignore
  const { height, width } = currentComponent.value?.style;
  if (key == "top") {
    //@ts-ignore
    return Math.round(value - (height - currentStyle.height) / 2);
  }
  //@ts-ignore
  return Math.round(value - (width - currentStyle.width) / 2);
};
</script>

<style scoped lang="scss">
.mark-line {
  height: 100%;

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
