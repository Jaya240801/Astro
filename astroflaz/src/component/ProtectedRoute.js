function ProtectedRoute({children}) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');  // Example way of checking authentication

    if (isAuthenticated) {
        return children;
    } else {
        window.location.replace("/");
        return null;
    }
}

export default ProtectedRoute;