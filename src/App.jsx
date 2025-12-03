import React from 'react';
import { Tabs } from 'antd';
import ClientesPage from './pages/ClientesPage';
import PacotesPage from './pages/PacotesPage';


export default function App() {
return (
<div style={{ padding: 20 }}>
<h1>Sistema de Viagens - CRUDs</h1>
<Tabs
items={[
{ key: '1', label: 'Clientes', children: <ClientesPage /> },
{ key: '2', label: 'Pacotes', children: <PacotesPage /> },
]}
/>
</div>
);
}