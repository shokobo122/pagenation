import React, { useEffect , useState} from 'react';
import axios from "axios";
import { Link, useSearchParams } from 'react-router-dom';
import PageNav from './pageNav';


export default function Gallery() {
  const [ar, setAr] = useState([])
  const [query] = useSearchParams();

  useEffect(() => {
    doApi();
  }, [query])

  const doApi = async () => {
    let url = `https://picsum.photos/v2/list?page=${query.get("page")}&limit=10`;
    let resp = await axios.get(url);
    console.log(resp.data);
    setAr(resp.data);
  }

  return (
    <div className='container'>
      <h2>List of Images: {query.get("page")}</h2>
      <PageNav />
      <div className="row">
        {ar.map(item => {
          return (
            <div key={item.id} className='col-md-6 border'>
              <h2>{item.author}</h2>
              <div>Width: {item.width}</div>
              <div>Height: {item.height}</div>
              <a target={"_blank"} href={item.download_url}>Link to image</a>
            </div>
          )
        })}

      </div>
    </div>
  )
}



// https://picsum.photos/v2/list?=1&limit=10

