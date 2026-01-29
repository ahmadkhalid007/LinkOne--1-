import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  studentId?: string;
  role: 'student' | 'admin';
  adminRole?: 'teacher' | 'course_coordinator' | 'director' | 'department_head' | 'vice_chancellor';
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'admin', adminRole?: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'student' | 'admin', studentId?: string, department?: string, adminRole?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'student' | 'admin' = 'student', adminRole?: string) => {
    // Mock login - in production, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful login
    if (role === 'admin') {
      setUser({
        id: 'admin-1',
        name: adminRole === 'vice_chancellor' ? 'Dr. Robert Thompson' : 
              adminRole === 'department_head' ? 'Dr. Sarah Williams' :
              adminRole === 'director' ? 'Prof. Michael Johnson' :
              adminRole === 'course_coordinator' ? 'Dr. Emily Smith' :
              'Admin User',
        email: email,
        role: 'admin',
        adminRole: adminRole as any,
        department: 'Computer Science',
      });
    } else {
      setUser({
        id: '1',
        name: 'John Doe',
        email: email,
        studentId: '2021-CS-001',
        role: 'student',
      });
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'student' | 'admin' = 'student', studentId?: string, department?: string, adminRole?: string) => {
    // Mock signup - in production, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful signup
    setUser({
      id: role === 'admin' ? 'admin-1' : '1',
      name: name,
      email: email,
      studentId: studentId,
      role: role,
      department: department,
      adminRole: adminRole as any,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin'
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}