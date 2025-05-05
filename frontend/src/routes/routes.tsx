import { RouteObject } from 'react-router-dom'
import LoginPortal from '../components/LoginPortal'
import React from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import ProblemList from '../components/ProblemList'
import ProblemDisplay from '../components/ProblemDisplay'
import ProblemPage from '../pages/ProblemPage'
import MainPage from '../pages/MainPage'

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPortal />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/detail/:problemId',
    element: (
      <ProtectedRoute>
        <ProblemPage />
      </ProtectedRoute>
    ),
  },
]
