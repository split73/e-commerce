import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpZA, faArrowDownZA } from '@fortawesome/free-solid-svg-icons'
import "./assets/Content.css"

let data;

export default function Content() {
  
    const [items, setItems] = useState([]);
    const [displayItems, setDisplayItems] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(13);
  const [sortDirection, setSortDirection] = useState(true)
  const [sortButtonIcon, setSortButtonIcon] = useState(faArrowUpZA)

  const handleSearch = () => {
    setDisplayItems([])
    const keyword = "beatae ";
    const filtered = items.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));
    console.log(filtered)
    setItems(filtered);
    displayScrollData();
  }

  const handleSortItems = () => {
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
          for (let i = 0; i < 12; i++) {
            tmp.push(data[i])
          }
          setDisplayItems(tmp);
          tmp = 0
          setPage(13)
  }

 


    const fetchData = async () => {
      console.log("QS")
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos`);
          data = await response.json();
          setItems(data);
          let tmp = [];
          for (let i = 0; i < 12; i++) {
            tmp.push(data[i])
          }
          setDisplayItems(tmp);
          tmp = 0
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      const displayScrollData = () => {
        for (let i = page; i < page + 12; i++){
          setDisplayItems(prev => [...prev, items[i]]);
        }
        setPage(prevPage => prevPage + 12);
      }

      useEffect(() => {
        fetchData();
      }, []);
  return (
    <div>
    <button style={{position: "fixed", left: "5%", top: "13%"}} onClick={handleSearch}>sssssss</button>
     <button id='sort-button-content' onClick={handleSortItems}><FontAwesomeIcon icon={sortButtonIcon} />sort</button>
      <div className='qqq' style={{position: "relative", top: 20}}>
   
        <InfiniteScroll
      dataLength={displayItems.length}
      next={displayScrollData}
      hasMore={true}
      // loader={<p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}
    >
      <div>
        {displayItems.map((item) => (
          <Card style={{ width: '18rem', float: "left", height: 350}}>
      <Card.Body>
        <Card.Img loading="lazy" style={{height: 180, width: "16rem"}} variant="top" src={item.thumbnailUrl}/>
        <Card.Title>{item.title}</Card.Title>
        <Button style={{position: "absolute", bottom: 10}} variant="primary">Add to cart</Button>
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
