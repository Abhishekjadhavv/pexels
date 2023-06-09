import './Header.css'
import headerImage from '../../assets/bg-imag.webp'
import { useState } from 'react'
import { getDefaultImage } from '../../Store/Slices/GetImages'
import { useDispatch } from 'react-redux'
const Header = () => {
  // ------ useState hook ---
  const [searchValue,setSearchValue] =  useState("");

  const dispatch = useDispatch()
  const handleSubmit = (e)=>{
    e.preventDefault();
  }
  const getData = ()=>{
    document.getElementById("loader").classList.add('loading');
    dispatch(getDefaultImage([]));
    fetch(`https://api.pexels.com/v1/search?query=${searchValue}&per_page=20`, {
      headers: {
        Authorization:
          "mJ35taICKw7ljQSFUvpHe7IKZtWyDJHZyrZuVeijFOTTVT9FlIXbYpfO",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(getDefaultImage(data.photos))
        setTimeout(()=>{
          document.getElementById("loader").classList.remove('loading');
        },5000)
      })
      .catch((error) => {
        console.log(error);
      });
      setSearchValue("")
  }
  return (
    <div className='header-contain justify-center'>
        <div className="header-data flex justify-center flex-col">
           <h2 className='header-contain-heading'>The best free stock photos, royalty free images & videos shared by creators.</h2>
           <form onSubmit={handleSubmit}>
               <div className="input-filed">
                  <input type="text" placeholder='Search photos here' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
                  <svg width="30" height="30" className="red search-icon" fill="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={getData}>
                    <path d="m21.75 20.063-5.816-5.818a7.523 7.523 0 0 0 1.44-4.433c0-4.17-3.393-7.562-7.562-7.562-4.17 0-7.562 3.392-7.562 7.562s3.392 7.562 7.562 7.562a7.523 7.523 0 0 0 4.433-1.44l5.818 5.816 1.687-1.688ZM9.812 14.986a5.174 5.174 0 1 1-.002-10.35 5.174 5.174 0 0 1 0 10.349Z"></path>
                  </svg>
               </div>
           </form>
        </div>
        <img src={headerImage} alt="headerImage" />
    </div>
  )
}

export default Header