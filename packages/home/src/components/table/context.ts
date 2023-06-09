import { createContext } from '../../utils/create-context'
import { ModelState, initState } from './table-model'

const RulerContext = createContext<ModelState>(initState)
export { RulerContext }
export default RulerContext
