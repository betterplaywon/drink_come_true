import React, { useMemo } from 'react'
import { Form, Input } from 'antd'

const NicknameForm = () => {
  const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '15px' }), [])
  const { Search } = Input
  return (
    <Form style={style}>
      <Search addonBefore="닉네임" addonAfter="수정" />
    </Form>
  )
}

export default NicknameForm
