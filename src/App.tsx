import { useState } from 'react'
import Header from './components/header'

function App() {

    const [phoneBookOpen, setPhoneBookOpen] = useState(false);

  return (
    <div>
        <Header setPhoneBookOpen={setPhoneBookOpen}/>
        {phoneBookOpen && <DataGridDemo />}
    </div>
  )
}

export default App
