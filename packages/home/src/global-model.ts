import { createModel } from "@/utils/create-context"

export interface ModelState {
  reportWidth: number  
}

export const initState: ModelState = {
  reportWidth: 0,
}

export default createModel(initState, {
  init () {
    return { ...initState }
  },
  updateReportSize (state, payload: { reportWidth: number }) {
    return { ...state, reportWidth: payload.reportWidth }
  },
})
