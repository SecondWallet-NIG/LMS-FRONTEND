import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/constant';

let user;
if (typeof window !== 'undefined') {
  user = JSON.parse(localStorage.getItem("user"));
}

export const createUser = createAsyncThunk('user/createUser', async (userData) => {
  try {
    const response = await axios.post(API_URL + '/user/create', userData,  {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const loginUser = createAsyncThunk('user/loginUser', async (loginData) => {
  try {
    const response = await axios.post(API_URL + '/auth/login', loginData);
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const getVerifyToken = createAsyncThunk('auth/getToken', async (payload) => {
  try {
    const response = await axios.post(API_URL + '/auth/reset-password/verify-email',  payload);
    return response.data;
  } catch (error) {
    if (error.response.data.error === "User not found") {
      throw new Error("User not found")
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const verifyToken = createAsyncThunk('auth/verifyToken', async (payload) => {
  try {
    const response = await axios.post(API_URL + '/auth/reset-password/verify-token ', payload);
    return response.data;
  } catch (error) {
    if (error.response.data.error === "Invalid Token! Try again") {
      throw new Error("Invalid Token! Try again")
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async ({ userId, updatedData }) => {
  const response = await axios.put(`/api/user/${userId}`, updatedData);
  return response.data;
});

export const getUserById = createAsyncThunk('user/getUser', async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/user/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const getAllUsers= createAsyncThunk('user/getAllUsers', async () => {
  try {
    const response = await axios.get(`${API_URL}/user?page=1&per_page=100&sortedBy=-createdAt`,  {
      headers: {
        Authorization: `Bearer ${user?.data?.token}`
      }
    }) 
    console.log({response});
    return response.data;
  } catch (error) {
    if (error.response.data.error) {
      throw new Error(error.response.data.error)
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const resetPassword = createAsyncThunk('auth/restPassword', async (payload) => {
  try {
    const response = await axios.post(API_URL + '/auth/reset-password ',  payload);
    return response.data;
  } catch (error) {
    if (error.response.data.error === "Invalid Token! Try again") {
      throw new Error("Invalid Token! Try again")
    }
    else throw new Error("An error occured, please try again later")
  }
});
const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    clearUserState: (state) => {
      state.data = null;
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(createUser.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getVerifyToken.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getVerifyToken.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getVerifyToken.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(verifyToken.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearUserState } = userSlice.actions;

export default userSlice.reducer;
