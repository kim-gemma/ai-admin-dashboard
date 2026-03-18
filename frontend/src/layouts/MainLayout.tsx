// src/layouts/MainLayout.tsx
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;