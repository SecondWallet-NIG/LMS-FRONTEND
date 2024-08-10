import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '@/constant';
import { getToken } from "@/helpers";


let user;
if (typeof window !== 'undefined') {
  user = JSON.parse(localStorage.getItem("user"));
}

export const loginUser = createAsyncThunk('user/loginUser', async (loginData) => {
  try {
    const response = await axios.post(API_URL + '/auth/login', loginData);
    return response.data;
  } catch (error) {
    if (error.response.data.error === "Incorrect email or password") {
      throw new Error("Incorrect email or password")
    }
    else throw new Error("An error occured, please try again later")
  }
});

export const getRoles = createAsyncThunk('role/getRoles', async () => {
  const response = await axios.get(`${API_URL}/role/all`, {
    headers: {
      Authorization: `Bearer ${user?.data?.token}`,
      
    },
    responseType: ""
  });
  return response.data;
});

export const getDepartments = createAsyncThunk('department', async () => {
  const response = await axios.get(`${API_URL}/department?page=1&per_page=100&sortedBy=-createdAt`, {
    headers: {
      Authorization: `Bearer ${user?.data?.token}`
    }
  });
  return response.data;
});

export const createRole = createAsyncThunk(
  "role/create",
  async ({ payload }) => {
    try {
      let token = getToken();
      const response = await axios.post(
        `${API_URL}/role`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data || response;
    } catch (error) {
      if (error?.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else throw new Error("An error occured, please try again later");
    }
  }
);

export const createDepartment = createAsyncThunk(
  "department/create",
  async ({ payload }) => {
    try {
      let token = getToken();
      const response = await axios.post(
        `${API_URL}/department`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data || response;
    } catch (error) {
      if (error?.response?.data?.error) {
        throw new Error(error.response.data.error);
      } else throw new Error("An error occured, please try again later");
    }
  }
);



const roleSlice = createSlice({
  name: 'role',
  initialState: {
    data: null,
    loading: 'idle',
    error: null,
  },
  reducers: {
    // Reducer logic for actions not handled by createAsyncThunk
    clearUserState: (state) => {
      state.data = null;
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getRoles.rejected, (state, action,) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      .addCase(getDepartments.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.deptData = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
  },
});

export const { clearUserState } = roleSlice.actions;

export default roleSlice.reducer;
