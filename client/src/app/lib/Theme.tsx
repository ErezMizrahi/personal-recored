"use client"
import { ThemeProvider } from "styled-components"

const theme = { 
    colors: {
        dark : '#23292d',
        secondary: '#2c3135',
        primary : '#FF9D74',
        primaryHover : '#e9f0f4',
        borderPrimary:'#FF9D74',
        textColorPrimary:'#7a828c',
        greenPrimary:'#C8EABA'
    }
}

const Theme = ({ children } : { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
        { children }
    </ThemeProvider>
  )
}

export default Theme