function Sidebar(){
    return(
        <div style={{width:"200px",height:"100vh", background:"#1e293b", color: "white",
      padding: "20px"}}>
            <h2>Admin</h2>
            <ul>
                <li>Dashboard</li>
                <li>Users</li>
                <li>Posts</li>
            </ul>
        </div>
    )
}

export default Sidebar;