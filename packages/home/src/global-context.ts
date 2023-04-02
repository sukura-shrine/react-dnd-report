import { createContext } from './utils/create-context'
import { ModelState, initState } from './global-model'

const GlobalContext = createContext<ModelState>(initState)

export default GlobalContext
