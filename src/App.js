import React,{useState,useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Input } from '@material-ui/core';
import { Button } from '@material-ui/core';
import InstagramEmbed from 'react-instagram-embed';


import Header from './Components/Header/header';
import Post from './Components/Post/Post';
import Imageupload from './Components/Firebase/Imageupload';
import './App.css';
import image from '../src/images/insta.png';


import { db,auth } from '../src/Components/Firebase/firebase';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {
  
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [posts, setposts] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [logo, setlogo] = useState(image);
  const [user,setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const signup = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authuser) => {
      return authuser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error)=> alert(error.message));
    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false)
  }
 
  useEffect(()=>{
    const unsubscribe =  auth.onAuthStateChanged((authuser) => {
      if(authuser) {
        console.log(authuser,"authuser");
        setUser(authuser);

        if(authuser.displayName){

        } else {

          return authuser.updateProfile({
            displayName:username,
          });
        }
      }else{
        setUser(null);
      }
    })

    return() => {
      unsubscribe();
    }
  },[user,username]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setposts(snapshot.docs.map(doc =>({ 
        id    : doc.id,
        post  : doc.data()
      })));
    })
  }, []);
  return (
    <div className="App">
     
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form className="app__signup">
              <center>
                <img className="logo__png"
                  src={logo}
                  alt="logo"/>
              </center>
              <Input placeholder="username"
              type="text"
              value={username}
              onChange = {(e)=> setUsername(e.target.value)}/>
              <Input placeholder="email"
              type="text"
              value={email}
              onChange = {(e)=> setEmail(e.target.value)}/>
              <Input 
              placeholder = "password"
              type = "password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signup} >sign Up</Button>
         
            </form>
            
            

          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openSignIn}
        onClose= {() => setOpenSignIn(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openSignIn}>
          <div className={classes.paper}>
            <form className="app__signup">
              <center>
                <img className="logo__png"
                  src={logo}
                  alt="logo"/>
              </center>
              <Input placeholder="email"
              type="text"
              value={email}
              onChange = {(e)=> setEmail(e.target.value)}/>
              <Input 
              placeholder = "password"
              type = "password"
              value = {password}
              onChange = {(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signIn} >sign In</Button>
         
            </form>
            
            

          </div>
        </Fade>
      </Modal>
      {/* <Header user = { user} />  */}
      <div className="header__div header__nav">
            <nav style={{width:"50%"}}>
                <div className="header__navimg">
                    <img src={logo} alt="logo"></img>
                </div>
            </nav>
            {
        user ? 
          ( <div className= "app__loginContainer">
              <Button  onClick={() => auth.signOut()} >Logout</Button>
            </div>
          ):(
          <div className= "app__loginContainer">
            <Button  onClick={() => setOpenSignIn(true) } >Sign In</Button>
            <Button  onClick={handleOpen} >Sign up</Button>
          </div>)
          
        }
      </div>
      <div className="app__post">
      {
        posts.map(({id,post}) => (
          <Post key={id} postId ={id} user={user} username = {post.username} imgUrl = {post.imgUrl} caption = {post.caption} />
        ))
      }
      </div>
     
     
     {
        user?.displayName ?(
          <Imageupload username = { user.displayName}/>
        ):
        (
          <h3>Sorry you need to login</h3>
        ) }
      {/* Post */}
    </div>
  );
}

export default App;

