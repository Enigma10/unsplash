import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import "./App.scss";
import { ModalComponent } from "./modal";

const UnsplashImage = ({ url, index, handleOpenImage }) => (
  <div className="image-item" key={index}>
    <img
      alt="unsplashimages"
      src={url}
      onClick={() => {
        handleOpenImage(index);
      }}
    />
  </div>
);

export const App = () => {
  const [images, setImages] = useState([]);
  const [loaded, setIsLoaded] = useState(false);
  const [openImage, setOpenImage] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, []);

  const fetchImages = (count = 10) => {
    const apiRoot = "https://api.unsplash.com";
    const accessKey =
      "219f743bc081fec260602770df90e2b5fb8329b8c8e04915cdd0f48f18f33089";

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then(res => {
        setImages([...images, ...res.data]);
        setIsLoaded(true);

        console.log(images);
      });
  };

  const handleOpenImage = index => {
    setOpenImage(true);
    setSelectedImageIndex(index);
  };

  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="container">
          <div className="header content">
            <h2 className="title is-1">Loco Code Challenge </h2>
          </div>
          <InfiniteScroll
            dataLength={images}
            next={() => fetchImages(5)}
            hasMore={true}
            loader={
              <img
                src="https://pbs.twimg.com/profile_images/958726814377172992/pHAMA2K9_80x80.jpg"
                alt="loading"
              />
            }
          >
            <div className="image-grid" style={{ marginTop: "30px" }}>
              {loaded
                ? images.map((image, index) => (
                    <UnsplashImage
                      url={image.urls.regular}
                      index={index}
                      handleOpenImage={handleOpenImage}
                    />
                  ))
                : ""}
            </div>
          </InfiniteScroll>
          {openImage ? (
            <ModalComponent
              images={images}
              index={selectedImageIndex}
              openImage={openImage}
              setOpenImage={setOpenImage}
            />
          ) : (
            false
          )}
        </div>
      </div>
    </div>
  );
};
