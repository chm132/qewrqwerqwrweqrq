import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface JoinStateProps {
  phoneNum: string;
}

const initialState = {
  phoneNum: '',
} as JoinStateProps;

const joinPhoneSlice = createSlice({
  name: 'joinPhone',
  initialState,
  reducers: {
    // 번호 입력하면 바로 dispatch
    setPhoneNum: (state, action: PayloadAction<JoinStateProps>) => {
      state.phoneNum = action.payload.phoneNum;
    },
  },
});

export const { setPhoneNum } = joinPhoneSlice.actions;

export default joinPhoneSlice.reducer;
