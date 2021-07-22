import { loadUsers, removeUser, login, logout, signup } from '../store/actions/userActions'
import { Component } from 'react'
import { connect } from 'react-redux'

class _LoginSignup extends Component {
  state = {
    isLogin: true,
    msg: '',
    loginCred: {
      username: '',
      password: ''
    },
    signupCred: {
      username: '',
      password: '',
      fullname: ''
    }
  }
  onToggleLoginSignup = () => {
    this.setState({ isLogin: !this.state.isLogin })
  }
  componentDidMount() {
    this.props.loadUsers()
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: {
        ...prevState.loginCred,
        [name]: value
      }
    }))
  }

  signupHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password }
    try {
      this.props.login(userCreds)
      this.setState({ loginCred: { username: '', password: '' } })
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' })
    }
  }

  doSignup = async ev => {
    ev.preventDefault()
    const { username, password, fullname } = this.state.signupCred
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' })
    }
    const signupCreds = { username, password, fullname }
    this.props.signup(signupCreds)
    this.setState({ signupCred: { username: '', password: '', fullname: '' } })
  }

  removeUser = userId => {
    this.props.removeUser(userId)
  }
  render() {

    let loginSection = (
      <form className="frm" onSubmit={this.doLogin}>
        <h2 className='title'>Login</h2>
        <div className='cradentials'>

          <input
            name="username"
            value={this.state.loginCred.username}
            onChange={this.loginHandleChange}
            autoComplete='off'
            placeholder='Username'
          >
          </input>
          <input
            name="password"
            type="password"
            value={this.state.loginCred.password}
            onChange={this.loginHandleChange}
            placeholder="Password"
            autoComplete="off"
          />
          <button className='login-signup-btn' onClick={this.doLogin}>Login</button>
        </div>
      </form>
    )
    let signupSection = (
      <form className="frm" onSubmit={this.doSignup}>
        <h2 className='title'>Signup</h2>
        <div className='cradentials'>

          <input
            type="text"
            name="fullname"
            value={this.state.signupCred.fullname}
            onChange={this.signupHandleChange}
            placeholder="Full name"
            autoComplete="off"
          />
          <input
            name="password"
            value={this.state.signupCred.password}
            onChange={this.signupHandleChange}
            placeholder="Password"
            autoComplete="off"
          />
          <input
            type="text"
            name="username"
            value={this.state.signupCred.username}
            onChange={this.signupHandleChange}
            placeholder="Username"
            autoComplete="off"
          />
          <button className='login-signup-btn' >Signup</button>
        </div>
      </form>
    )

    const { isLogin } = this.state
    const { loggedInUser } = this.props
    return (
      <div className="form-container">
        <div className="login-sigup">
          <p>{this.state.msg}</p>
          {loggedInUser && (
            <div className='welcome-user-msg'>
              <h3>
                Welcome {loggedInUser.fullname}
              </h3>
              <button className='login-signup-btn' onClick={this.props.logout}>Logout</button>
            </div>
          )}
          {!loggedInUser && isLogin && loginSection}
          {!loggedInUser && !isLogin && signupSection}
          {!loggedInUser && < div onClick={this.onToggleLoginSignup} className='change-login-signup-btn'>{(isLogin) ? 'don\'t have an account yet?' : 'I already have an account'}</div>}
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
  }
}
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(_LoginSignup)