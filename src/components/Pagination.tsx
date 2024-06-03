'use client';

import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/fetchUser';

interface User {
    ID: number;
  FirstNameLastName: string;
  Email: string;
  JobTitle: string
  Phone: string
}

const Pagination = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(page);
        setUsers(data.users);
      } catch (error) {
        console.error(error);
      }
    };
    loadUsers();
  }, [page]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.ID}>
            {user.FirstNameLastName} - {user.Email} - {user.JobTitle} - {user.Phone}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrev} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Pagination;
