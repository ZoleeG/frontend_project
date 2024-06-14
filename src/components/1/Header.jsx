import { Link } from 'react-router-dom';
import {useState, useContext} from 'react';
import {fetchUser} from '../../../utils/api.js';
import { FaRegCircleCheck } from "react-icons/fa6";
import { ThemeContext } from '../../context/Theme';

const Header = () => {

  const { activeUser, setActiveUser } = useContext(ThemeContext)
  const [err, setErr] = useState(null)
  const [message, setMessage] = useState()
  const [user, setUser] = useState("")

  const handleChange = (e) =>{
    e.preventDefault()
      setUser(e.target.value)
  }


  const handleSubmit =(e)=>{
    e.preventDefault()
    setErr(null)
    setMessage(null)
    setActiveUser(null)
    fetchUser(user).then(([userData])=>{
      setActiveUser(userData)
      setUser("")
      setMessage(`Hi ${userData.name}`)
    })
    .catch((error)=>{
      setUser("")
      setErr(error.message)
    })
  }
  

  return (
      <nav className="topnav">
        {activeUser ? <><img src={activeUser.avatar_url} alt="Avatar" className="avatar"/>
        <button onClick={()=>setActiveUser(null)} className="sign_out" type='button' value='SIGN OUT'>SIGN OUT</button></> : <form onSubmit={handleSubmit} className="select_user" id="select_user_form">
        <img src={activeUser ? activeUser.avatar_url : "https://www.w3schools.com/howto/img_avatar.png"} alt="Avatar" className="avatar"/>
        <label className="dropdown" htmlFor="user">
          <select id="user"
            type="text" 
            onChange={handleChange}
            value={user}
            required
          >
            <option value="">Sign in here</option>
            <option value="tickle122">tickle122</option>
            <option value="grumpy19">grumpy19</option>
            <option value="happyamy2016">happyamy2016</option>
            <option value="cooljmessy">cooljmessy</option>
            <option value="weegembump">weegembump</option>
            <option value="jessjelly">jessjelly</option>
          </select>
        </label>
        <input type="submit" className='login' id='login' name='login' value='Sign in'/>
        </form>}
        {activeUser ? <p className="check"><FaRegCircleCheck /></p> : null}
        {activeUser ? <p className="greeting">{message}</p> : null}
        {activeUser ? <p className="success">{`Signed in as ${activeUser.name}`}</p> : null}
        {activeUser ? <p className="username_display">{`${activeUser.username}`}</p> : null}
        {err ? <p className="error">{err}</p> : null}
      </nav>
  );
};

export default Header
