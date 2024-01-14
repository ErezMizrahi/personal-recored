"use client"
import { ThemeProvider } from "styled-components"

const theme = { 
    colors: {
        darkest : '#161A30',
        dark : '#31304D',
        lightest : '#F0ECE570',
        light : '#B6BBC4',
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