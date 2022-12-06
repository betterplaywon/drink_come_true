import React, { useState } from "react"
import Link from "next/link"
import { Menu, Input, Row, Col } from "antd"
import PropTypes from "prop-types"
import styled from "styled-components"

const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">Drink Come True</Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">프로필</Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">회원가입</Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <SearchInput enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>

      <Row gutter={8}>
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          RIGHT SIDE
        </Col>
      </Row>
    </div>
  )
}
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

const SearchInput = styled(Input.Search)`
  verticalalign: "middle";
`

export default AppLayout
