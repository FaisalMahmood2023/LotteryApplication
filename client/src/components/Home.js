import React from "react";

const Home = ({ transferAmount }) => {
  return (
    <>
      <div
        id="thisShouldBeUniquePerCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner ">
          <div className="carousel-item active">
            <img
              src="./Images/1.png"
              className="d-block w-100 img-fluid"
              alt="Responsive image"
            />
            <div className="carousel-caption d-none d-md-block">
              <button
                onClick={transferAmount}
                type="button"
                className="btn btn-success"
              >
                Transfer Amount
              </button>
              <p className="my-3">
                A Player can Transfer 1 Ether only for a part of the Lottery
                System.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="./Images/2.png"
              className="d-block w-100 img-fluid"
              alt="Responsive image"
            />
            <div className="carousel-caption d-none d-md-block">
              <button
                onClick={transferAmount}
                type="button"
                className="btn btn-success"
              >
                Transfer Amount
              </button>
              <p className="my-3">
                A Player can Transfer 1 Ether only for a part in the Lottery
                System.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="./Images/3.png"
              className="d-block w-100 img-fluid"
              alt="Responsive image"
            />
            <div className="carousel-caption d-none d-md-block">
              <button
                onClick={transferAmount}
                type="button"
                className="btn btn-success"
              >
                Transfer Amount
              </button>
              <p className="my-3">
                A Player can Transfer 1 Ether only for a part in the Lottery
                System.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};
export default Home;
