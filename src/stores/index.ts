import {useLowStore} from "./useLowStore/index"
import  { useArea, useLowCodeState, useStack,useContextMenu, useAce } from "./useLowStore/moudles"
import { useUser } from "./user"

export interface IAppStore {
    lowStore:ReturnType<typeof useLowStore>,
    state:ReturnType<typeof useLowCodeState>,
    stack:ReturnType<typeof useStack>,
    area:ReturnType<typeof useArea>,
    contextMenu:ReturnType<typeof useContextMenu>,
    ace: ReturnType<typeof useAce>,
    user: ReturnType<typeof useUser>
} 

export const appStore:IAppStore = {} as IAppStore

export const registerStore = () => {
    appStore.state = useLowCodeState()
    appStore.lowStore = useLowStore()
    appStore.stack = useStack()
    appStore.area = useArea()
    appStore.contextMenu = useContextMenu()
    appStore.ace = useAce()
    appStore.user = useUser()
}

