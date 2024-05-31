import { useState } from 'react'
import Header from './components/header'
import DataGridDemo from './components/phonebook'

export class MenuItem {

    constructor(
        public name: string,
        public isOpen: boolean,
        public setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
    ) {}
}

export class MenuItemList {

    public menuItemList: MenuItem[] = [];

    get getMenuItemList() {
        return this.menuItemList;
    }

    addMenuItem(menuItem: MenuItem) {
        this.menuItemList.push(menuItem)
    }

    openMenuItem(name: string) {
        this.menuItemList.forEach(menuItem => {
            if(menuItem.name === name) {
                menuItem.setIsOpen(true);
            } else {
                menuItem.setIsOpen(false);
            }
        })
    }
}

function App() {

    const [phoneBookOpen, setPhoneBookOpen] = useState(false);

    const menuItemList = new MenuItemList();
    menuItemList.addMenuItem(new MenuItem("Phonebook", phoneBookOpen, setPhoneBookOpen));

  return (
    <div>
        <Header menuItemList={menuItemList}/>
        {phoneBookOpen && <DataGridDemo />}
    </div>
  )
}

export default App
