import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import TinderCard from './TinderCard';

const EditProfile = ({user}) => {
    const [emailId,setEmailId] = useState(user.email || '')
    const [password,setPassword] = useState('')
    const [error, setError] = useState(' ');
    const [name, setName] = useState(user.name || '')
    const [phoneNo, setPhoneNo] = useState(user.phoneno || ' ');
    const [photoUrl, setPhotoUrl] = useState(user.photoURL || ' ');
    const [about, setAbout] = useState(user.about || ' ');
    const [skills, setSkills] = useState(user.skills);
    const [age, setAge] = useState(user.age || ' ');
    const [gender, setGender] = useState(user.gender || ' ');
    const [showToast, setShowToast] = useState(false);

    const dispatch = useDispatch();
    const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(import.meta.env.VITE_BASE_URL + '/profile/edit', { name, email: emailId, phoneno: phoneNo, photoURL: photoUrl, about,skills }, { withCredentials: true }).then(
        response => {
            console.log('Profile updated successfully:', response.data);
            dispatch(addUser(response.data.field))
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 3000);
        }
    ).catch(error => {
        console.error('Profile update error:', error?.response?.data || error.message);
        setError(error?.response?.data || 'Something went wrong');
    }
    )
  };
useEffect(()=>{
     dispatch(addUser({
      name: name,
      email: emailId,
      phoneno: phoneNo,
      photoURL: photoUrl,
      about: about,
      skills: skills,
      age: age,
      gender: gender
     })) 
  },[name, emailId, phoneNo, photoUrl, about, skills])
  return (
    <div>
       <div className="bg-base-200 min-h-screen flex items-center justify-center">
      <div className="card w-76 bg-base-100 shadow-2xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Edit Profile</h2>

          <form>
            {/* Name */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Phone no */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="input input-bordered"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            {/* Name */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Enter your photo URL"
                className="input input-bordered"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
              />
            </div>

          
            {/* About */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <fieldset className="fieldset">
  <textarea className="textarea h-24" placeholder="Bio" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
  <div className="label">Optional</div>
</fieldset>
            </div>

            {/* Skills */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <input
                type="text"
                placeholder="Enter your skills (comma separated)"
                className="input input-bordered"
                value={skills}
                onChange={(e) => {
                  return setSkills(e.target.value.split(',').map(skill => skill.trim()));
                }}
                required
              />
            </div>
            <p className="text-red-500">{error}</p>

            {/* Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full" onClick={handleSubmit}>
                Save Profile
              </button>
            </div>
          </form>
          
         { showToast && (
            <div className="toast toast-top toast-center">
              <div className="alert alert-success">
                <span>Profile saved successfully.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  )
}

export default EditProfile;