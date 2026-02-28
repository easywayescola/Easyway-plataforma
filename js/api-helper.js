/**
 * API Helper - Centralized API communication for EasyWay frontend
 * Handles authentication, error handling, and token management
 */

// Configuration
const API_CONFIG = {
    // Development: http://localhost:5000/api
    // Production: https://easyway-backend-production-4094.up.railway.app/api
    baseURL: localStorage.getItem('API_URL') || 'https://easyway-backend-production-4094.up.railway.app/api',
    timeout: 10000
};

/**
 * Make an authenticated API call
 * @param {string} endpoint - API endpoint (e.g., '/auth/login')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<object>} - Response data
 */
async function apiCall(endpoint, options = {}) {
    try {
        const token = localStorage.getItem('token');
        
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        const url = `${API_CONFIG.baseURL}${endpoint}`;
        
        const response = await fetch(url, {
            ...options,
            headers,
            timeout: API_CONFIG.timeout
        });
        
        // Handle 401 - Token expired or invalid
        if (response.status === 401) {
            localStorage.clear();
            window.location.href = 'login.html';
            return null;
        }
        
        // Handle other errors
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || `HTTP ${response.status}`);
        }
        
        return response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

/**
 * Authentication API calls
 */
const AuthAPI = {
    // Teacher registration
    registerTeacher: async (email, password, name, schoolName) => {
        return apiCall('/auth/teacher/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name, school_name: schoolName })
        });
    },
    
    // Teacher login
    loginTeacher: async (email, password) => {
        return apiCall('/auth/teacher/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },
    
    // Student login
    loginStudent: async (email, password) => {
        return apiCall('/auth/student/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    },
    
    // Logout
    logout: async () => {
        localStorage.clear();
        return Promise.resolve();
    }
};

/**
 * Teacher API calls
 */
const TeacherAPI = {
    // Get all students
    getStudents: async () => {
        return apiCall('/teacher/students', { method: 'GET' });
    },
    
    // Create a new student
    createStudent: async (email, name, level, className, password) => {
        return apiCall('/teacher/students', {
            method: 'POST',
            body: JSON.stringify({ email, name, level, class_name: className, password })
        });
    },
    
    // Update student level
    updateStudentLevel: async (studentId, level) => {
        return apiCall(`/teacher/students/${studentId}`, {
            method: 'PUT',
            body: JSON.stringify({ level })
        });
    },
    
    // Delete student
    deleteStudent: async (studentId) => {
        return apiCall(`/teacher/students/${studentId}`, {
            method: 'DELETE'
        });
    },
    
    // Get student progress
    getStudentProgress: async (studentId) => {
        return apiCall(`/teacher/students/${studentId}/progress`, { method: 'GET' });
    },
    
    // Get all quizzes
    getQuizzes: async (level = null) => {
        const url = level ? `/teacher/quizzes?level=${level}` : '/teacher/quizzes';
        return apiCall(url, { method: 'GET' });
    },
    
    // Assign quiz to student
    assignQuiz: async (studentId, quizId) => {
        return apiCall(`/teacher/students/${studentId}/assign-quiz`, {
            method: 'POST',
            body: JSON.stringify({ quizId })
        });
    }
};

/**
 * Student API calls
 */
const StudentAPI = {
    // Get student profile
    getProfile: async () => {
        return apiCall('/student/profile', { method: 'GET' });
    },
    
    // Get available quizzes
    getQuizzes: async () => {
        return apiCall('/student/quizzes', { method: 'GET' });
    },
    
    // Get quiz details
    getQuizDetails: async (quizId) => {
        return apiCall(`/student/quizzes/${quizId}`, { method: 'GET' });
    },
    
    // Start a quiz
    startQuiz: async (quizId) => {
        return apiCall(`/student/quizzes/${quizId}/start`, {
            method: 'POST'
        });
    },
    
    // Submit answer
    submitAnswer: async (attemptId, questionId, selectedOptionId) => {
        return apiCall(`/student/attempts/${attemptId}/answer`, {
            method: 'POST',
            body: JSON.stringify({ questionId, selectedOptionId })
        });
    },
    
    // Complete quiz
    completeQuiz: async (attemptId) => {
        return apiCall(`/student/attempts/${attemptId}/complete`, {
            method: 'POST'
        });
    },
    
    // Get progress
    getProgress: async () => {
        return apiCall('/student/progress', { method: 'GET' });
    },
    
    // Get quiz attempts
    getAttempts: async () => {
        return apiCall('/student/attempts', { method: 'GET' });
    }
};

/**
 * Utility functions
 */
const APIUtils = {
    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
    
    // Get current user type
    getUserType: () => {
        return localStorage.getItem('userType');
    },
    
    // Get current user ID
    getUserId: () => {
        return localStorage.getItem('userId');
    },
    
    // Get current user name
    getUserName: () => {
        return localStorage.getItem('userName');
    },
    
    // Redirect to login if not authenticated
    requireAuth: () => {
        if (!APIUtils.isAuthenticated()) {
            window.location.href = 'login.html';
        }
    },
    
    // Set API base URL (for production deployment)
    setBaseURL: (url) => {
        API_CONFIG.baseURL = url;
        localStorage.setItem('API_URL', url);
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { apiCall, AuthAPI, TeacherAPI, StudentAPI, APIUtils };
}
