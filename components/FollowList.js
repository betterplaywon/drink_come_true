import React, { useMemo } from 'react'
import { Form, Input, List, Card, Button } from 'antd'
import PropTypes from 'prop-types'
import { StopOutlined } from '@ant-design/icons'

const FollowList = ({ data, header }) => {
  const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '15px' }), [])
  const { Meta } = Card
  return (
    <List
      style={style}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <>
          <Button>더보기</Button>
        </>
      }
      bordered
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Card actions={[<StopOutlined key="stop" />]}>
            <Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  )
}

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
}

export default FollowList
