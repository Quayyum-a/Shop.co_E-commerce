import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

// Simulate user database
const mockUsers = [
  {
    id: 1,
    email: 'john@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 123-4567',
    dateJoined: '2024-01-15',
    preferences: {
      newsletter: true,
      smsUpdates: false,
      size: 'L',
      favoriteCategories: ['men\'s clothing']
    }
  },
  {
    id: 2,
    email: 'jane@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+1 (555) 987-6543',
    dateJoined: '2024-02-20',
    preferences: {
      newsletter: false,
      smsUpdates: true,
      size: 'M',
      favoriteCategories: ['women\'s clothing']
    }
  }
]

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.user = null
      state.error = action.payload
    },
    registerStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    registerSuccess: (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.error = null
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    registerFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      // Clear localStorage
      localStorage.removeItem('user')
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    clearError: (state) => {
      state.error = null
    },
    initializeAuth: (state) => {
      // Check localStorage for existing user
      const savedUser = localStorage.getItem('user')
      if (savedUser) {
        try {
          state.user = JSON.parse(savedUser)
          state.isAuthenticated = true
        } catch (error) {
          localStorage.removeItem('user')
        }
      }
    }
  },
})

// Async action creators
export const loginUser = (credentials) => (dispatch) => {
  dispatch(loginStart())
  
  // Simulate API call delay
  setTimeout(() => {
    const user = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    )
    
    if (user) {
      const { password, ...userWithoutPassword } = user
      dispatch(loginSuccess(userWithoutPassword))
    } else {
      dispatch(loginFailure('Invalid email or password'))
    }
  }, 1000)
}

export const registerUser = (userData) => (dispatch) => {
  dispatch(registerStart())
  
  // Simulate API call delay
  setTimeout(() => {
    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === userData.email)
    
    if (existingUser) {
      dispatch(registerFailure('Email already exists'))
      return
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone || '',
      dateJoined: new Date().toISOString().split('T')[0],
      preferences: {
        newsletter: true,
        smsUpdates: false,
        size: 'M',
        favoriteCategories: []
      }
    }
    
    // Add to mock database
    mockUsers.push({ ...newUser, password: userData.password })
    
    dispatch(registerSuccess(newUser))
  }, 1000)
}

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  updateProfile,
  clearError,
  initializeAuth
} = authSlice.actions

export default authSlice.reducer
