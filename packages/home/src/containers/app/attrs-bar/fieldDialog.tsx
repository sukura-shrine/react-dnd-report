import React from 'react'
import { Modal, Form, Input } from 'antd'


interface FieldProps {
  open: boolean,
  onCancel: () => void
  onOk: (values: any) => void
}

const initialValues = {
  'A': 'A',
  'B': 'B',
  'C': 'C',
}

export default function FieldDialog ({ open, onCancel, onOk }: FieldProps) {
  const [form] = Form.useForm()
  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onOk(values)
          })
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initialValues}
      >
        <Form.Item
          name="A"
          label="A"
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}