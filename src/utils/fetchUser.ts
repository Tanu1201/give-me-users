export const fetchUsers = async (page: number) => {
  const res = await fetch(
    `https://give-me-users-forever.vercel.app/api/users/${page}/next`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  return res.json();
};
