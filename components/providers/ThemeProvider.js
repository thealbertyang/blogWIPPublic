import { theme } from '../../styles/theme'
import { ThemeProvider } from 'styled-components'

const Provider = ({ children }) => (
    <ThemeProvider theme={theme}>
        {children}
    </ThemeProvider>    
)

export default Provider