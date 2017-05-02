import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

console.log(Layout)
console.log(Header)
console.log(Content)

/**
 * 在React中处理表单有些不一样，由于React提倡“单向数据流”，
 * React中的表单并不提供双向数据绑定的功能，我们需要给表单绑定它的value，
 * 然后提供一个onChange的处理方法来更新value的值。
 * 这里我们使用组件的state来维护表单的值，在onChange的时候使用setState来更新值，
 * 最后，在表单提交事件被触发的时候，我们输出state来观察最终获得的表单值：
 */
class UserAdd extends React.Component {
    constructor(){
        super();
        this.state = {
            name: '',
            age: 0,
            gender: ''
        };
    }
    handleValueChange (field, value, type = 'string') {
        // 由于表单的值都是字符串，我们可以根据传入type为number来手动转换value的类型为number类型
        if (type === 'number') {
            value = +value;
        }

        this.setState({
            [field]: value
        });
    }
    handleSubmit (e) {
        e.preventDefault();

        const {name, age, gender} = this.state;
        fetch('http://localhost:4000/user', {
            method: 'post',
            // 使用fetch提交的json数据需要使用JSON.stringify转换为字符串
            body: JSON.stringify({
                name,
                age,
                gender
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                // 当添加成功时，返回的json对象中应包含一个有效的id字段
                // 所以可以使用res.id来判断添加是否成功
                if (res.id) {
                    alert('添加用户成功');
                    this.setState({
                        name: '',
                        age: 0,
                        gender: ''
                    });
                } else {
                    alert('添加失败');
                }
            })
            .catch((err) => console.error(err));
    }
    render () {
        const {name, age, gender} = this.state;
        return (
            <div>
                <header>
                    <h1>添加用户</h1>
                </header>

                <main>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <label>用户名：</label>
                        <input type="text" value={name} onChange={(e) => this.handleValueChange('name', e.target.value)}/>
                        <br/>
                        <label>年龄：</label>
                        <input type="number" value={age || ''} onChange={(e) => this.handleValueChange('age', e.target.value, 'number')}/>
                        <br/>
                        <label>性别：</label>
                        <select value={gender} onChange={(e) => this.handleValueChange('gender', e.target.value)}>
                            <option value="">请选择</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                        <br/>
                        <br/>
                        <input type="submit" value="提交"/>
                    </form>
                </main>
            </div>
        );
    }
}

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          style={{ height:'900px' }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
)

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

ReactDOM.render((
    <Router>
        <div>
            <Route exact path="/" component={SiderDemo}/>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topics}/>
            <Route path="/user/add" component={UserAdd}/>
        </div>
    </Router>
), 
document.getElementById('example'));



