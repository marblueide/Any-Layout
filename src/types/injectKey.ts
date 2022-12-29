import type { InjectionKey, Ref } from "vue";
import type { LowCanvasData } from "./LowCode";

export const CURRENTCOMPONENT = Symbol() as InjectionKey<Ref<LowCanvasData>>;
