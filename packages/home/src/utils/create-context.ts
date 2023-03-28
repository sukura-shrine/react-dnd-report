import React from 'react'

export interface Action {
  type: string, payload?: any
}

export const createContext = <T>(initState: T) => {
  return React.createContext<{ state: T, dispatch: React.Dispatch<Action>}>({ state: initState, dispatch: () => {} })
}

export interface ModelReducer<T> {
  [key: string]: (state: T, payload?: any) => T
}

export const createModel = <T>(state: T, reducer: ModelReducer<T>) => {
  return {
    state,
    reducer (state: T, action: Action) {
      const { type, payload } = action
      if (reducer[type]) {
        return reducer[type](state, payload)
      }
      throw new Error(`Unknow type ${type}`)
    },
  }
}
