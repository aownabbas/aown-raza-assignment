import { Provider } from 'react-redux'
import { generateStore } from './store'

export default function ReduxProvider({ children }) {
	return <Provider store={generateStore()}>{children}</Provider>
}
