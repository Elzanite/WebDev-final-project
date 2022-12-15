import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const OtherUser = (username) => {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/users/' + username)
    .then(res => res.json())
    .then(res => setProfile({
      ...res,
      dob: res.dob.slice(0,10)
    }));
  }, [username])

    const Selling = (profile) => {
        if (profile.isSeller) {
            return('seller')
        } else {
            return('buyer');
        }
    };

  return (
      <div className="global-font">
        <h1 className="global-font highlighted-text">{profile.username}'s
          Profile</h1>
        <h4>Info:</h4>
        <div className="align-left top-margin">
          <h6>First Name:</h6>
          <h6>{profile.first}</h6>
        </div>
        <br/>

        <div className="align-left top-margin">
          <h6>Last Name:</h6>
          <h6>{profile.last}</h6>
        </div>
        <br/>

        <div className="align-left top-margin">
          <h6>Username:</h6>
          <h6>{profile.username}</h6>
        </div>

        <div className="align-left top-margin">
            <h6>This user is a {Selling(profile)}</h6>
        </div>

      </div>
  )
};


const LoggedInUser = (user, setUser) => {

  const [first, setFirst] = useState(user.first);
  const [last, setLast] = useState(user.last);
  const [username, setUsername] = useState(user.username);
  const [dob, setDob] = useState(user.dob.slice(0, 10));
  const [address, setAddress] = useState(user.address);
  const Selling = (profile) => {
      if (user.isSeller) {
          return('seller')
      } else {
          return('buyer');
      }
  };

  const handleChange = (event) => {
    switch (event.target.id) {
      case 'first':
        setFirst(event.target.value);
        return;
      case 'last':
        setLast(event.target.value);
        return;
      case 'dob':
        setDob(event.target.value);
        return;
      case 'address':
        setAddress(event.target.value);
        return;
      case 'username':
        setUsername(event.target.value);
        return;
      case 'update':
        fetch('http://localhost:4000/api/profile/' + user.username, {
          method: 'PUT',
          body: JSON.stringify({first: first, last: last, username: username, dob: dob, address: address, isSeller: user.isSeller, _id: user._id}),
          headers: {
            'content-type':'application/json'
          }
        })
        .then(res => setUser({
          first: first,
          last: last,
          username: username,
          dob: dob,
          address: address,
          isSeller: user.isSeller
        }))

        break;
      default:
        return;
    }
  }

  return(
      <div className="global-font">
        <h1 className="global-font highlighted-text">Your Profile</h1>
        <h4>Info:</h4>
        <div className="align-left top-margin">
          <h6>First Name:</h6>
          <input id="first" className="form-control" value={first} onChange={handleChange}/>
        </div> <br/>

        <div className="align-left top-margin">
          <h6>Last Name:</h6>
          <input id="last" className="form-control" value={last} onChange={handleChange}/>
        </div> <br/>

        <div className="align-left top-margin">
          <h6>Username:</h6>
          <input id="username" className="form-control" value={username} onChange={handleChange}/>
        </div> <br/>

        <div className="align-left top-margin">
          <h6>Date of Birth:</h6>
          <input id="dob" type="date" className="form-control" value={dob} onChange={handleChange}/>
        </div> <br/>

        <div className="align-left top-margin">
          <h6>Address:</h6>
          <input id="address" className="form-control" value={address} onChange={handleChange}/>
        </div> <br/>

        <div className="align-left top-margin">
            <h6>You are a {Selling(user)}</h6>
        </div>
        <button id="update" className="btn btn-primary" onClick={handleChange}>Update</button>
      </div>
      )
}

const ProfilePage = (props) => {
  const params = useParams();
  if (props.user.first === undefined) {
    return(<h1 className="global-font highlighted-text">Please Log In To View Profile</h1>);
  } else if (props.user.username === params.username) { 
    return (LoggedInUser(props.user, props.setUser))
  } else {  
    return(OtherUser(params.username));
  }

};

export default ProfilePage;