import { useEffect, useState } from "react";
import { getUsers, createUser, UserItem } from "../api/users"; // WebSocket 기반
import MainLayout from "../layouts/MainLayout";

function Users() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchData = async () => {
    try {
      const data = await getUsers();   // WebSocket /ws/users  action: getUsers
      setUsers(data);
    } catch (error) {
      console.error("사용자 목록 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const newUser = await createUser({ name, email }); // WebSocket /ws/users  action: addUser
      setUsers((prev) => [...prev, newUser]);
      setName("");
      setEmail("");
    } catch (error) {
      console.error("사용자 추가 실패:", error);
    }
  };

  return (
    <MainLayout>
      <h1>사용자 목록</h1>

      {/* 입력 영역 */}
      <div>
        <input
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAdd}>추가</button>
      </div>

      {/* 테이블 */}
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>이메일</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
}

export default Users;
