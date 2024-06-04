'use client';

import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/fetchUser';

interface User {
  ID: number,
  FirstNameLastName: string;
  Email: string;
  JobTitle: string;
  Phone: string;
}

const Pagination = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers(page);
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    loadUsers();
  }, [page]);

  const handleNext = () => setPage((prev) => (prev + 1)*10);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1 , 1));

  return (
    <div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <><div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Job Title</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.ID}>
                    <td>{user.ID}</td>
                    <td>{user.FirstNameLastName}</td>
                    <td>{user.Email}</td>
                    <td>{user.JobTitle}</td>
                    <td>{user.Phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div><div className="pagination">
              <button onClick={handlePrev} disabled={page === 1}>
                Prev
              </button>
              <span>Page {page}</span>
              <button onClick={handleNext}>Next</button>
            </div></>
      )}
    </div>
  );
};

export default Pagination;
