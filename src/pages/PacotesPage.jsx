import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import PacoteDAO from '../daos/PacoteDAO';


const pacoteDAO = new PacoteDAO();


export default function PacotesPage() {
const [dados, setDados] = useState([]);
const [modalAberto, setModalAberto] = useState(false);
const [editando, setEditando] = useState(null);
const [form] = Form.useForm();


const carregar = () => setDados(pacoteDAO.getAll());


useEffect(() => {
carregar();
}, []);


const salvar = () => {
form.validateFields().then((values) => {
if (editando) {
pacoteDAO.update(editando.id, { ...values, id: editando.id });
} else {
pacoteDAO.create({ ...values, id: Date.now() });
}


setModalAberto(false);
form.resetFields();
setEditando(null);
carregar();
});
};


const colunas = [
{ title: 'Destino', dataIndex: 'destino' },
{ title: 'Preço', dataIndex: 'preco' },
{ title: 'Data Ida', dataIndex: 'dataIda' },
{ title: 'Data Volta', dataIndex: 'dataVolta' },
{
title: 'Ações',
render: (_, record) => (
<>
<Button onClick={() => {
setEditando(record);
form.setFieldsValue(record);
setModalAberto(true);
}}>Editar</Button>
<Button danger style={{ marginLeft: 10 }} onClick={() => {
pacoteDAO.delete(record.id);
carregar();
}}>Excluir</Button>
</>
),
},
];


return (
<div>
<Button type="primary" onClick={() => setModalAberto(true)}>Novo Pacote</Button>
<Table dataSource={dados} columns={colunas} rowKey="id" style={{ marginTop: 20 }} />


<Modal
open={modalAberto}
onCancel={() => { setModalAberto(false); setEditando(null); form.resetFields(); }}
onOk={salvar}
title={editando ? 'Editar Pacote' : 'Novo Pacote'}
>
<Form form={form} layout="vertical">
<Form.Item name="destino" label="Destino" rules={[{ required: true }]}>
<Input />
</Form.Item>
<Form.Item name="preco" label="Preço" rules={[{ required: true }]}>
<Input />
</Form.Item>
<Form.Item name="dataIda" label="Data Ida" rules={[{ required: true }]}>
<Input type="date" />
</Form.Item>
<Form.Item name="dataVolta" label="Data Volta" rules={[{ required: true }]}>
<Input type="date" />
</Form.Item>
</Form>
</Modal>
</div>
);
}