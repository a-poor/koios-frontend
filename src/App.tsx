import React, { useState, useEffect } from 'react'
import { createServer } from 'miragejs'
import './App.css'
import 'antd/dist/antd.css'

import { 
  DatePicker,
  Layout, 
  Menu, 
} from 'antd'

const { Header, Content, Footer } = Layout;


createServer({
  routes() {
    this.get("/api/users", () => [
      { id: "1", name: "Luke" },
      { id: "2", name: "Leia" },
      { id: "3", name: "Anakin" },
    ])
  },
})

function App() {
  let [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }, [])

  return (
    <div className="App">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
            })}
          </Menu>
        </Header>
        <div className="spacer" style={{ height: "20px", }} />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <DatePicker />
            <ul>
              {
                users.map((user: {id: string, name: string}) => (
                  <li key={user.id}>{user.name}</li>
                ))
              }
            </ul>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Koios ©2022 Created by Austin Poor
        </Footer>
      </Layout>
    </div>
  )
}

export default App
