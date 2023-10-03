import Button from "@mui/material/Button"
import { useColorScheme } from "@mui/material/styles"

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light")
      }}
    >
      {mode === "light" ? "Turn dark" : "Turn light"}
    </Button>
  )
}

function App() {
  return (
    <>
      <ModeToggle />
      <hr />
      <div>minhuy206</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </>
  )
}

export default App
