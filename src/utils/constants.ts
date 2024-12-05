export const MOCK_USERS = {
  student: { username: 'student', password: 'password123', role: 'student' },
  staff: { username: 'staff', password: 'password123', role: 'staff' },
} as const;

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  WRITING_LAB: '/writing-lab',
} as const;