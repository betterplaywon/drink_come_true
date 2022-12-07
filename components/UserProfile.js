import React from 'react'
import { Avatar, Card, Button } from 'antd'

const UserProfile = ({ setIsLoggedIn }) => {
  const { Meta } = Card

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <Card
      style={{ width: 300 }}
      cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
      //   actions={[<SettingOutlined key="setting" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
      actions={[
        <div key="like">좋아요 수 </div>,
        <div key="post">포스팅 수: 0</div>,
        <div key="notice">공지사항 수0</div>,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="술은 이루어진다"
        description="show your drink"
      />
      <Button onClick={handleLogout}>로그아웃</Button>
    </Card>
  )
}

export default UserProfile
