import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
      <>
    {isAuthenticated?<LogoutButton/>:<LoginButton/>}
    </>
  );
};

const LogoutButton = () => {
    const { logout } = useAuth0();
  
    return <button onClick={() => logout()}>Log Out</button>;
};

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
  
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default Profile;