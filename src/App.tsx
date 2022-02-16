import React, { useState, useEffect } from 'react'
import { createServer } from 'miragejs'
import './App.css'
import 'antd/dist/antd.css'

import { 
  DatePicker,
  Layout, 
  Menu, 
} from 'antd'

import { 
  UserOutlined, 
  LaptopOutlined, 
  NotificationOutlined, 
} from '@ant-design/icons'

const { SubMenu } = Menu

const { 
  Header, 
  Content, 
  Footer, 
  Sider, 
} = Layout


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
  const [selectedTab, setSelectedTab] = useState("explore")

  // Temporary tool for testing with fake backend data
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }, [])

  return (
    <Layout className="App">
      <Header>
        <div className="logo" />
        <Menu 
          theme="dark" 
          mode="horizontal" 
          defaultSelectedKeys={[selectedTab]}
          onClick={e => setSelectedTab(e.key)}
        >
          <Menu.Item key="explore">Explore</Menu.Item>
          <Menu.Item key="model">Model</Menu.Item>
          <Menu.Item key="add">Add Data</Menu.Item>
          <Menu.Item key="viz">Visualize</Menu.Item>
          <Menu.Item key="account">Account</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content 
          style={{ 
            padding: '0 50px', 
          }
        }>
          <div className="site-layout-content">
            <p>Welcome to the { selectedTab } tab!</p>
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
      </Layout>
    </Layout>
  )
}

export default App
