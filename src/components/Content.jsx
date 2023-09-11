import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpZA, faArrowDownZA } from '@fortawesome/free-solid-svg-icons'
import "./assets/Content.css"

let data;

export default function Content(props) {
  
    const [items, setItems] = useState([]);
    const [displayItems, setDisplayItems] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(16);
  const [sortDirection, setSortDirection] = useState(true)
  const [sortButtonIcon, setSortButtonIcon] = useState(faArrowUpZA)

  useEffect(() => {
    setIsLoading(true)
    data=items;
    window.scrollTo(0, 0)
    setDisplayItems([])
    const keyword = props.passSearchInput;
    data = data.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));
    displayScrollData();
  }, [props.passSearchInput]);

  const hadleAddToCart = (item) => {
    console.log("ADD", item)
  }

  const handleSortItems = () => {
    setIsLoading(true)
    if (data[2] !== undefined){
      window.scrollTo(0, 0)
    if (sortDirection){
      data.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
      });
      
      setSortButtonIcon(faArrowDownZA)
      setSortDirection(false)
    } else {
      data.sort((a, b) => {
        if (b.title < a.title) {
          return -1;
        }
      });
      setSortButtonIcon(faArrowUpZA)
      setSortDirection(true)
    }
    
    setItems(data);
          let tmp = [];
          for (let i = 0; i < 15; i++) {
            tmp.push(data[i])
          }
          setDisplayItems(tmp);
          tmp = 0
          setPage(16)
    }
  }

    const fetchData = async () => {
      setIsLoading(true)
        setError(null);
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
          data = await response.json();
          setItems(data);
          let tmp = [];
          for (let i = 0; i < 15; i++) {
            tmp.push(data[i])
          }
          setDisplayItems(tmp);
          tmp = 0
        } catch (error) {
          setError(error);
        } 
      };

      const displayScrollData = () => {
        console.log(data.length, "Q", isLoading)
        for (let i = page; i < page + 15; i++){
          if(data[i] !== undefined){
            setDisplayItems(prev => [...prev, data[i]]);
          } else {
            
            console.log("FAFAFAF", data, data[i], i)
            setIsLoading(false)
            break;
          }
        }
        setPage(prevPage => prevPage + 15);
      }

      useEffect(() => {
        fetchData();
      }, []);
  return (
    <div >
     <button className="content-sort-buttons" id='sort-button-content' onClick={handleSortItems}><FontAwesomeIcon icon={sortButtonIcon} />sort</button>
      <div className='qqq' style={{position: "relative", top: 20}}>
   
        <InfiniteScroll
      dataLength={displayItems.length}
      next={displayScrollData}
      hasMore={isLoading}
      loader={<p style={{position: "absolute", bottom: -100, left: 950}}>Loading...</p>}
      endMessage={<p style={{position: "absolute", bottom: -100, left: 900}}>No more data to load.</p>}
    >
      <div style={{marginLeft: "250px"}}>
        {displayItems.map((item) => (
          <Card style={{ width: '18rem', float: "left", height: 350}}>
      <Card.Body>
        <Card.Img loading="lazy" style={{height: 180, width: "16rem"}} variant="top" src={item.thumbnailUrl}/>
        <Card.Title>{item.title}</Card.Title>
        <Button style={{position: "absolute", bottom: 10}} variant="primary" onClick={() => hadleAddToCart(item)}>Add to cart</Button>
      </Card.Body>
    </Card>
        ))}
      </div>
    </InfiniteScroll>
    {error && <p>Error: {error.message}</p>}
    </div>
    </div>
  )
}
