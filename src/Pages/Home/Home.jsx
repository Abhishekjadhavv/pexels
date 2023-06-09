import React, { useEffect} from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import "./Home.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDefaultImage } from "../../Store/Slices/GetImages";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'


const Home = () => {
  const data = useSelector(store => store.image);

  const dispatch = useDispatch();


  // ------- downloadImage ----
   const downloadImage = (url)=>{
    fetch(url, {
      method: "GET",
      headers: {}
    })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
   }
  

  useEffect(() => {
    document.getElementById("loader").classList.add('loading');
    fetch(`https://api.pexels.com/v1/search?query="coding"&per_page=20`, {
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
        },2000)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  return (
    <>
      <div className="header">
        <Navbar />
        <Header />
      </div>
      <section className="section">
        <div className="section-header flex justify-center gap-1-5">
          <NavLink to="/" className="section-header-links active1">Home</NavLink>
          <NavLink  className="section-header-links">Videos</NavLink>
          <NavLink  className="section-header-links">Leaderboard</NavLink>
          <NavLink  className="section-header-links">Challenges</NavLink>
        </div>
        <div className="section-contain">
          <h2>Free Stock Photos</h2>
          <div className="images">
            {
              data.map((ele, index) => {
                return (
                  <div className="image" key={index}>
                    <img src={ele.src.original} alt="post"/>
                    <div className="image-footer">
                      <div className="user-name flex gap-1">
                        <img src="https://images.pexels.com/users/avatars/2848684/mathias-reding-452.jpeg?auto=compress&fit=crop&h=40&w=40&dpr=1" alt="userimage" />
                        <span>{ele.photographer}</span>
                      </div>
                      <div className="download">
                        <svg width="40" height="40" className="red" fill="#000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" onClick={()=>downloadImage(ele.src.original)} >
                          <path d="M3 14.1a.6.6 0 0 1 .6.6v3a1.2 1.2 0 0 0 1.2 1.2h14.4a1.2 1.2 0 0 0 1.2-1.2v-3a.6.6 0 1 1 1.2 0v3a2.4 2.4 0 0 1-2.4 2.4H4.8a2.4 2.4 0 0 1-2.4-2.4v-3a.6.6 0 0 1 .6-.6Z"></path>
                          <path d="M11.576 16.445a.6.6 0 0 0 .85 0l3.6-3.6a.6.6 0 1 0-.85-.85L12.6 14.572V4.02a.6.6 0 1 0-1.2 0v10.552l-2.576-2.577a.6.6 0 1 0-.85.85l3.6 3.6Z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  )
              })
            }
            
          </div>
        </div>
      </section>
      <section className="view-more flex justify-center">
            <button className="view-more-btn">View more</button>
      </section>
    </>
  );
};

export default Home;
