import React, { useEffect } from 'react';
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RoomTypeSelector from '../common/RoomTypeSelector';

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: '',
    roomPrice: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { id } = useParams();

  const updateRoomType = (data) => {
    setRoom({ ...room, roomType: data });

  };


  const handleRoomInputChange = (event) => {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  };

  const handleRoomImageChange = (e) => {
    const selectedImage = e.target.files[0]
    setRoom({...room, photo:selectedImage})
    setImagePreview(URL.createObjectURL(selectedImage))
}

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(id);
        setRoom(roomData);

        if (roomData.photo) {
          setImagePreview(roomData.photo);
        } else {
          setImagePreview('');
        }
      } catch (error) {
        console.error('Error fetching room:', error);
        setErrorMsg(error.message);
      }
    };

    fetchRoom();
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await updateRoom(id, room.photo, room.roomType, room.roomPrice);
      if (success) {
        setSuccessMsg("Room Updated successfully!");
        setErrorMsg("");
        setRoom({
            photo: null,
            roomType: '',
            roomPrice: ''
        });
        setImagePreview("");

    } else {
        setErrorMsg("Failed to update room");
        setSuccessMsg("");
    }

    } catch (error) {
      console.error('Error editing room:', error);
      setErrorMsg(error.message);
    }
  };

  return (
    <section className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="mt-5 mb-2">Edit Room</h2>

          {successMsg && (
            <div className="alert alert-success fade show" role="alert">
              {successMsg}
            </div>
          )}

          {errorMsg && (
            <div className="alert alert-danger fade show" role="alert">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label">
                Room Type
              </label>
              <div>
                <RoomTypeSelector
                  handleNewRoomTypeInputChange={handleRoomInputChange}
                  newRoom={room}
                  roomType={updateRoomType}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label">
                Room Price
              </label>
              <input
                className="form-control"
                required
                id="roomPrice"
                name="roomPrice"
                type="number"
                value={room.roomPrice}
                onChange={handleRoomInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Room Photo
              </label>
              <input
                className="form-control mb-3 mr-3 ml-3"
                required
                id="photo"
                name="photo"
                type="file"
                onChange={handleRoomImageChange}
              />

              {imagePreview && (
                <img
                  src={`data:image/jpeg;base64,${imagePreview}`}
                  alt="Room Photo Preview"
                  style={{ maxWidth: '400px', maxHeight: '400px' }}
                  className="mb-3"
                />
              )}
            </div>

            <div className="d-grid d-md-flex mt-2 gap-2">
              <Link to="/existing-rooms" className="btn btn-outline-info ml-5">
                Back
              </Link>
              <button className="btn btn-outline-warning ml-5">Edit Room</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditRoom;
