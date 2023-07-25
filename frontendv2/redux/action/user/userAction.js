/* 현재 로그인 되어있는 유저의 정보 */

import { createAction } from "@reduxjs/toolkit";

export const saveUser = createAction('user/saveUser'); //로그인 성공했을 시
export const saveProfile = createAction('user/saveProfile') // 내정보 조회
export const saveEmail = createAction('user/saveEmail');
export const toggleProfile = createAction('user/toggleProfile');
export const logout = createAction('user/logout'); //로그아웃
