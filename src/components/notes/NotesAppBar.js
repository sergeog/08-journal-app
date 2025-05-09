import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const handleSave = () => {
    dispatch(startSaveNote(active));
  };

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploading(file));
    }
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto del 2020</span>

      <input
        type="file"
        id="fileSelector"
        name="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <div>
        <button className="btn" id="btn-picture" onClick={handlePictureClick}>
          Picture
        </button>
        <button className="btn" id="btn-save" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
