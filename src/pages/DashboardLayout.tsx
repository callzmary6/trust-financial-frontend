import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {

    const {logout} = useAuth();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <button onClick={()=>logout()}>Logout</button>
    </div>
  );
};

export default DashboardLayout;