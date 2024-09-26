
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { MenuItem } from 'primereact/menuitem';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import { useAccountStore } from '../../store/zustand';

export default function Header() {
    const account = useAccountStore((state) => state.account);

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
            badge: 3,
        }
    ];

    const start = <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-8">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image={
                account?.avatar || "https://cdn-icons-png.flaticon.com/512/6681/6681204.png"} shape="circle" />
        </div>
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} end={end} />
        </div>
    )
}
        