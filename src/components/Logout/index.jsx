const Logout = () => {
    const { logout } = useAuth();
    
    return (
        <button onClick={logout}>Logout</button>
    );
};
