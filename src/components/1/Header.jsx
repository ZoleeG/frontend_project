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


  const handleSubmit =(e)=>{
    e.preventDefault()
    setErr(null)
    setMessage(null)
    setActiveUser(null)
    fetchUser(user).then(([userData])=>{
      setActiveUser(userData)
      setUser("")
      setMessage('Logged in')
    })
    .catch(()=>{
      setUser("")
      setErr('Oops, something went wrong, try again!')
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
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          >
            <option value="">Please select</option>
            <option value="tickle122">tickle122</option>
            <option value="grumpy19">grumpy19</option>
            <option value="happyamy2016">happyamy2016</option>
            <option value="cooljmessy">cooljmessy</option>
            <option value="weegembump">weegembump</option>
            <option value="jessjelly">jessjelly</option>
          </select>
        </label>
        <input className="login" type="submit" value='LOGIN'/>
        </form>}
        {activeUser ? <p className="check"><FaRegCircleCheck /></p> : null}
        {activeUser ? <p className="success">{message}</p> : null}
        {activeUser ? <p className="greeting">{`Hi ${activeUser.name}`}</p> : null}
        {activeUser ? <p className="username_display">{`${activeUser.username}`}</p> : null}
        {err ? <p className="error">{err}</p> : null}
      </nav>
  );
};

export default Header
