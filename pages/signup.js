import React from "react"
import Head from "next/head"
import AppLayout from "../components/AppLayout"
import { AppleOutlined } from "@ant-design/icons"

const signup = () => {
  return (
    <>
      <Head>
        <title>회원가입</title>
      </Head>
      <AppLayout>회원가입 페이지</AppLayout>
    </>
  )
}
export default signup
