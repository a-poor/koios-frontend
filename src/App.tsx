import React, {useState, useEffect} from 'react';
import './App.css';
import 'antd/dist/antd.css';

import {DatePicker, Layout, Menu} from 'antd';

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';

import {If, Then, Else, When, Unless, Switch, Case, Default} from 'react-if';

import ExploreTab from './components/ExploreTab';
import ModelTab from './components/ModelTab';
import AddDataTab from './components/AddDataTab';
import VisualizeTab from './components/VisualizeTab';
import AccountTab from './components/AccountTab';

const {SubMenu} = Menu;

const {Header, Content, Footer, Sider} = Layout;


function App() {
  const [selectedTab, setSelectedTab] = useState('model');

  // Temporary tool for testing with fake backend data
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(json => setUsers(json));
  }, []);

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
          <Menu.Item key="model">Model</Menu.Item>
          <Menu.Item key="explore">Explore</Menu.Item>
          <Menu.Item key="add">Add Data</Menu.Item>
          <Menu.Item key="viz">Visualize</Menu.Item>
          <Menu.Item key="account">Account</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Content
          style={{
            padding: '0 50px',
          }}
        >
          <div className="site-layout-content">
            <Switch>
              <Case condition={selectedTab === 'explore'}>
                <ExploreTab />
              </Case>
              <Case condition={selectedTab === 'model'}>
                <ModelTab />
              </Case>
              <Case condition={selectedTab === 'add'}>
                <AddDataTab />
              </Case>
              <Case condition={selectedTab === 'viz'}>
                <VisualizeTab />
              </Case>
              <Case condition={selectedTab === 'account'}>
                <AccountTab />
              </Case>
              <Default>No tab selected...</Default>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
