import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export const ModalComponent = ({ images, index, openImage, setOpenImage }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(null);
  const [image, setImage] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
    setOpenImage(false);
  };
  useEffect(() => {
    setIsOpen(openImage);
    setImageIndex(index);
    setImage(images[index].urls.regular);
  }, [openImage]);

  return (
    <div className="modal">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          className="button is-light"
          style={{
            margin: "5px"
          }}
          onClick={closeModal}
        >
          close
        </button>
        <button
          style={{
            margin: "5px"
          }}
          className="button is-primary"
          disabled={!images[imageIndex - 1]}
          onClick={() => {
            if (images[imageIndex - 1]) {
              setImage(images[imageIndex - 1].urls.regular);
              setImageIndex(imageIndex - 1);
            }
          }}
        >
          Prev
        </button>
        <button
          style={{
            margin: "5px"
          }}
          disabled={!images[imageIndex + 1]}
          className="button is-primary"
          onClick={() => {
            if (images[imageIndex + 1]) {
              setImage(images[imageIndex + 1].urls.regular);
              setImageIndex(imageIndex + 1);
            }
          }}
        >
          Next
        </button>

        <br />
        {imageIndex ? (
          <img
            src={image}
            style={{
              width: "500px",
              height: "500px"
            }}
          />
        ) : (
          false
        )}
      </Modal>
    </div>
  );
};
