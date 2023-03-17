import React from 'react'
import model, { ModelState, Action, initState } from './model'
export interface ContextProps {
  state: ModelState
  dispatch: React.Dispatch<Action>
}

export const RulerContext = React.createContext<ContextProps>({ state: initState, dispatch: () => {} })