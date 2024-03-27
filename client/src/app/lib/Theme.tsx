"use client"
import { ThemeProvider } from "styled-components"

const theme = { 
    colors: {
        dark : '#23292D',
        secondary: '#ED5050',
        primary : '#23292D',
        light:"#F4F4F4",
        //suggested colors for cards based on the theme
        card:"#FCFCFC",
    },
    dimenssions: {
      verticalPadding: 20,
      horizontalPadding: 10,
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