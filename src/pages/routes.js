import { lazy } from 'react'

const Login = lazy(() => import('./Auth/Login'))
const AccountVerification = lazy(() => import('./Auth/AccountVerification'))
const NotFound = lazy(() => import('./404/NotFound'))
const AccountSetting = lazy(() => import('./AccountSetting/AccountSetting'))
const ForgotPassword = lazy(() => import('./Auth/ForgotPassword'))
const ResetPassword = lazy(() => import('./Auth/ResetPassword'))
const Board = lazy(() => import('./Boards/_id'))
const Boards = lazy(() => import('./Boards/Boards'))

export const routes = [
  {
    path: '/login',
    element: Login,
    public: true
  },
  {
    path: '/forgot-password',
    element: ForgotPassword,
    public: true
  },
  {
    path: '/reset-password',
    element: ResetPassword,
    public: true
  },

  {
    path: '*',
    element: NotFound,
    public: true
  },
  {
    path: '/',
    element: Boards,
    public: false
  },
  {
    path: '/boards',
    element: Boards,
    public: false
  },
  {
    path: '/boards/:_id',
    element: Board,
    public: false
  },
  {
    path: '/account/verification',
    element: AccountVerification,
    public: true
  },
  {
    path: '/settings/account',
    element: AccountSetting,
    public: false
  }
]
