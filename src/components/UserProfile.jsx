import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/profile.css";

const UserProfile = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderUserProfile = () => {
    if (!userEmail) {
      return <div>Loading...</div>; // Or display a login link
    }

    const displayName = userEmail.split("@")[0];
    const avatarInitial = displayName.charAt(0).toUpperCase();

    return (
      <div className="user-profile">
        <div className="profile-avatar">{avatarInitial}</div>
        <div className="greeting">
          <p>Hello {displayName}!</p>
        </div>
      </div>
    );
  };

  return <div>{renderUserProfile()}</div>;
};

export default UserProfile;
