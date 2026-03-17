import postgres from "postgres";

const sql = postgres();

const getAllUsers = async () => {
  return await sql`
    SELECT
      users.id,
      users.email,
      users.created_at,
      array_agg(user_roles.role) FILTER (WHERE user_roles.role IS NOT NULL) as roles
    FROM users
    LEFT JOIN user_roles ON users.id = user_roles.user_id
    GROUP BY users.id, users.email, users.created_at
    ORDER BY users.created_at DESC
  `;
};

const getTodoTotal = async () => {
    const result = await sql`
        SELECT COUNT(*) AS todo_count
        FROM todos
    `;
    return Number(result[0].todo_count);
};

const getTaskTotal = async () => {
    const result = await sql`
        SELECT COUNT(*) AS task_count
        FROM todo_tasks`;
    return Number(result[0].task_count);
};
export { getAllUsers, getTodoTotal, getTaskTotal };