import { experimental_extendTheme as extendTheme } from "@mui/material/styles"

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: "48px",
    boardBarHeight: "58px"
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#ff5252"
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: "#fff"
        }
      }
    }
  }
  // ...other properties
})
export default theme
