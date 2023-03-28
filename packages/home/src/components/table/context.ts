import { createContext } from '@/utils/create-context'
import { ModelState, initState } from './model'

export const RulerContext = createContext<ModelState>(initState)
