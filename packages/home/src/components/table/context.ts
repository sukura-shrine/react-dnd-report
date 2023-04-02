import { createContext } from '../../utils/create-context'
import { ModelState, initState } from './model'

const RulerContext = createContext<ModelState>(initState)
export { RulerContext }
export default RulerContext
