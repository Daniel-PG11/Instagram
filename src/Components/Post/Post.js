import React,{ useState , useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';

import './Post.css';
import { db } from '../Firebase/firebase';
import firebase from 'firebase';


function Post({username,imgUrl,caption,postId,user}) {
    const [comments,setComments] = useState([]);
    const [comment,setComment]  =   useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy('timestamp','desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };
    },[postId]);
    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment('');
    }
    return (
        <div className="Post">
            <div className="Post__avatar">
                <Avatar className="post__Avatar"
                alt="Danie" src="/static/images/avatar/1.img "/>
                <h3 className="Post__username" >{username}</h3>
            </div>
            <img className="post__img" src={imgUrl}></img>
            <h4 className="Post__capt" ><strong>{username}</strong> {caption}</h4>
               <div className="post__comments">
                    {comments.map((comment) => (
                            <p>
                                <strong>{comment.username} </strong>{comment.text}
                            </p>
    ))
                    }
                </div>
                {
                     user && (<form className="post__commentBox">
                     <input 
                         className="post__input"
                         type="text"
                         value={comment}
                         placeholder="Add a comment..."
                         onChange={(e) => setComment(e.target.value)}
                     />
                     <button 
                         className="post__button"
                         disabled={!comment}
                         type="submit"
                         onClick={postComment}
                     >
                         Post
                     </button>
                 </form>)                }
            
           
            {/* avatar name */}
            {/* post */}
            {/* user name caption */}
        </div>
    )
}

export default Post;
