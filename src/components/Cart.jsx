import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from '../auth/firebase';
import { useAuth } from '../auth/contexts/AuthContext';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpZA, faArrowDownZA } from '@fortawesome/free-solid-svg-icons';
import "./assets/Content.css";

export default function Cart() {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [sortDirection, setSortDirection] = useState(true);
  const [sortButtonIcon, setSortButtonIcon] = useState(faArrowUpZA);


  const fetchPost = async () => {
    if (currentUser !== null){
      console.log(currentUser)
      await getDocs(collection(db, currentUser.email))
          .then((querySnapshot)=>{               
              const newData = querySnapshot.docs
                  .map((doc) => ({...doc.data(), id:doc.id }));
                  setCartItems(newData);                
          })
    }
    console.log(cartItems)
  }
 
  useEffect(()=>{
      fetchPost();
  }, [])

  const handleRemove = (item) => {
    const docRef = doc(db, currentUser.email, item.id);
      deleteDoc(docRef)
        .then(() => {
          console.log("Entire Document has been deleted successfully.")
          let elementToFilter = item;
          setCartItems(cartItems.filter(item => item.id !== elementToFilter.id));
      })
        .catch(error => {
          console.log(error);
    })
  }

  const handleSortItems = () => {
    if (cartItems[0] !== undefined){
      window.scrollTo(0, 0);
      let data = cartItems;
    if (sortDirection){
      data.sort((a, b) => {
        if (a.item.title < b.item.title) {
          return -1;
        }
      });
      
      setSortButtonIcon(faArrowDownZA)
      setSortDirection(false)
    } else {
      data.sort((a, b) => {
        if (b.item.title < a.item.title) {
          return -1;
        }
      });
      setSortButtonIcon(faArrowUpZA)
      setSortDirection(true)
    }
    setCartItems(data);
    }
  }

  return (
    <div className='items-container' style={{marginLeft: "250px"}}>
     <button className="content-sort-buttons" id='sort-button-content' onClick={handleSortItems}><FontAwesomeIcon icon={sortButtonIcon} />sort</button>
        {cartItems.map((item) => (
          <Card key={item.id} style={{ width: '18rem', float: "left", height: 350}}>
      <Card.Body>
        <Card.Img loading="lazy" style={{height: 180, width: "16rem"}} variant="top" src={item.item.thumbnailUrl}/>
        <Card.Title>{item.item.title}</Card.Title>
        <Button style={{position: "absolute", bottom: 10}} variant="primary" onClick={() => handleRemove(item)}>remove</Button>
      </Card.Body>
    </Card>
        ))}
      </div>
  )
}
