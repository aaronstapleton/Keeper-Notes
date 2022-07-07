import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc, onSnapshot} from 'firebase/firestore';

const Dashboard = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const notesID = doc(db, 'users', `${user?.email}`);
  const [notes, setNotes] = React.useState([]);

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setNotes(doc.data()?.savedNotes);
    });
  }, [user?.email]);

 
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };

  const addNote = async (event, title, content) => {

    event.preventDefault();
    setNotes((prevNotes) => {
      return [...prevNotes, { title: title, content: content }];
    });
    await updateDoc(notesID, {
      savedNotes: arrayUnion({
        title: title,
        content: content,
      }),
    });

  };

  const deleteItem = async(id) => {
     setNotes((prevItems) => {
        return prevItems.filter((item, index) => {
           return index !== id;
        });
     });

     const result = notes.filter((item,index) => index !== id)
     await updateDoc(notesID, {
         savedNotes: result
     })
  };

  return (
    <div>
      <Header />
         <CreateArea adding={addNote} />

         {notes.map((note, index) => {
            return (
               <Note
                  id={index}
                  key={index}
                  title={note.title}
                  content={note.content}
                  deleting={deleteItem}
               />
            );
         })}
      

      
      <button onClick={handleLogout} className='border border-gray-500 bg-gray-600 hover:bg-gray-500 w-1/10 p-4 my-2 text-white rounded logout'>
        Logout
      </button>
    


      <Footer />
    </div>
  );
}

export default Dashboard;