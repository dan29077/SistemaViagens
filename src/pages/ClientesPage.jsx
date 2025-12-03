import React, { useEffect, useState } from 'react';
import ClienteDAO from '../daos/ClienteDAO';


const clienteDAO = new ClienteDAO();


export default function ClientesPage() {
const [dados, setDados] = useState([]);
const [modalAberto, setModalAberto] = useState(false);
const [editando, setEditando] = useState(null);
const [form] = Form.useForm();


const carregar = () => setDados(clienteDAO.getAll());


useEffect(() => {
carregar();
}, []);


const salvar = () => {
form.validateFields().then((values) => {
if (editando) {
clienteDAO.update(editando.id, { ...values, id: editando.id });
} else {
clienteDAO.create({ ...values, id: Date.now() });
}
setModalAberto(false);
form.resetFields();
setEditando(null);
carregar();
});
};


const colunas = [
{ title: 'Nome', dataIndex: 'nome' },
{ title: 'Email', dataIndex: 'email' },
{ title: 'Telefone', dataIndex: 'telefone' },
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
clienteDAO.delete(record.id);
carregar();
}}>Excluir</Button>
</>
),
},
];


return (
<div>
<Button type="primary" onClick={() => setModalAberto(true)}>Novo Cliente</Button>
<Table dataSource={dados} columns={colunas} rowKey="id" style={{ marginTop: 20 }} />


<Modal
open={modalAberto}
onCancel={() => { setModalAberto(false); setEditando(null); form.resetFields(); }}
onOk={salvar}
title={editando ? 'Editar Cliente' : 'Novo Cliente'}
>
<Form form={form} layout="vertical">
<Form.Item name="nome" label="Nome" rules={[{ required: true }]}>
<Input />
</Form.Item>
<Form.Item name="email" label="Email" rules={[{ required: true }]}>
<Input />
</Form.Item>
<Form.Item name="telefone" label="Telefone" rules={[{ required: true }]}>
<Input />
</Form.Item>
</Form>
</Modal>
</div>
);
}