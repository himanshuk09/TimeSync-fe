import React, { useState } from 'react'
import { Button, MenuItem, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl/FormControl';
import { useNavigate } from "react-router-dom";
const UserView = () => {
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    return (
        <div>
            <div className='edit-btn-block'>
                <h2>Details</h2>
                <Button variant="contained" className='edit-btn button' size="small" onClick={() => {
                    navigate('/dashboard/profile/edit');
                }} >
                    Edit!
                </Button>
            </div>
            <div className='details'>
                <div className="first-line">
                    <TextField id="outlined-basic" size='medium' className='text-field-details' label="First Name" variant="outlined" />
                    <TextField id="outlined-basic" size='medium' className='text-field-details' label="Last Name" variant="outlined" />
                </div>
                <div className="second-line">
                    <TextField id="outlined-basic" size='medium' className='text-field-details' label="Username" variant="outlined" />
                    <div className='role-drop-down'>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                label="Role"
                                onChange={event => setRole(event.target.value)}
                                variant='outlined'
                            >
                                <MenuItem value={10}>ADMIN</MenuItem>
                                <MenuItem value={20}>TEACHER</MenuItem>
                                <MenuItem value={30}>STUDENT</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="third-line">
                    <TextField id="outlined-basic" size='medium' className='text-field-details' label="Email Address" variant="outlined" />
                    <TextField id="outlined-basic" size='medium' className='text-field-details' label="Phone Number" variant="outlined" />
                </div>
                <div className="forth-line">
                    <div className='role-drop-down'>
                        <FormControl fullWidth >
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                label="Gender"
                                onChange={event => setRole(event.target.value)}
                                variant='outlined'
                            >
                                <MenuItem value={10}>Male</MenuItem>
                                <MenuItem value={20}>Female</MenuItem>
                                <MenuItem value={30}>Other</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <TextField id="outlined-basic" size='medium' className='text-field-details' label="Address" variant="outlined" />
                </div>
                <div className="fifth-line">
                    <TextField id="outlined-basic" size='medium' className='text-field-details' label="Organisation" variant="outlined" />
                    <TextField id="outlined-basic" size='medium' className='text-field-details' label="Department" variant="outlined" />
                </div>
            </div>
        </div>
    )
}

export default UserView;