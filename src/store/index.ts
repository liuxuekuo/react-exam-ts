import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import subjectReducer from './slice/subject';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export const store = configureStore({
    reducer: {
        subject: subjectReducer,
    },
});
// 只是加上了类型定义
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector