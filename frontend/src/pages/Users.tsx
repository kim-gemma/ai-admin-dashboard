import { useEffect, useState } from "react";
import { getUsers, createUser } from "../api/user";
import MainLayout from "../layouts/MainLayout";

function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchData = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    const newUser = await createUser({ name, email });

    setUsers((prev) => [...prev, newUser]);
    setName("");
    setEmail("");
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