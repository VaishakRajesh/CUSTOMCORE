import React, { useState, useEffect } from 'react';
import Style from './ViewUser.module.css';
import Img from './img/1.png';
import axios from 'axios';

const ViewUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to fetch all users from MongoDB using your existing endpoint
    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/collectionUser');
            
            // Check if response.data.user exists before setting state
            if (response.data && response.data.user) {
                setUsers(response.data.user);
                console.log("Users fetched:", response.data.user);
            } else {
                setUsers([]);
                console.warn('User data not found in response:', response.data);
            }
            
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
            console.error('Error fetching users:', err);
        }
    };

    // Function to delete a user using your existing endpoint
    const deleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await axios.delete(`http://localhost:5000/collectionUser/${userId}`);
                
                if (response.status === 200) {
                    // Update the state with filtered users
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
                    console.log("User deleted successfully:", userId);
                } else {
                    console.error("Delete request successful but with unexpected status:", response.status);
                }
            } catch (err) {
                setError('Failed to delete user');
                console.error('Error deleting user:', err);
                
                // Show a more detailed error message
                if (err.response) {
                    console.error('Server responded with:', err.response.status, err.response.data);
                } else if (err.request) {
                    console.error('No response received:', err.request);
                } else {
                    console.error('Error setting up request:', err.message);
                }
            }
        }
    };

    // Function to view more details of a user
    const viewUserDetails = (userId) => {
        // Navigate to user details page
        window.location.href = `/Admin/ViewUserDetails/${userId}`;
        // If you're using React Router, you can use:
        // navigate(`/user-details/${userId}`);
    };

    if (loading) return <div className={Style.loading}>Loading users...</div>;
    if (error) return <div className={Style.error}>{error}</div>;

    return (
        <div className={Style.Body}>
            <div className={Style.container}>
                <div className={Style.ViewUser}>
                    <div className={Style.Title}>
                        <div className={Style.TitleText}>Name</div>
                        <div className={Style.TitleText}>Email</div>
                        <div className={Style.TitleText}>Action</div>
                    </div>
                    
                    {!users || users.length === 0 ? (
                        <div className={Style.noUsers}>No users found</div>
                    ) : (
                        users.map(user => (
                            <div className={Style.UserDetails} key={user._id}>
                                <div className={Style.Name}>
                                    <div className={Style.ProfilePic}>
                                        <img src={user.userPhoto || Img} alt={user.userName} />
                                    </div>
                                    <div className={Style.userName}>{user.userName}</div>
                                </div>
                                <div className={Style.details}>{user.userEmail}</div>
                                <div className={Style.Button}>
                                    <button onClick={() => viewUserDetails(user._id)}>More Details</button>
                                    <button onClick={() => deleteUser(user._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewUser;