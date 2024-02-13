"use client"
import { ThemeProvider } from "styled-components"

const theme = { 
    colors: {
        dark : '#23292d',
        secondary: '#2c3135',
        primary : '#ed5050',
        light : '#e9f0f4',
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