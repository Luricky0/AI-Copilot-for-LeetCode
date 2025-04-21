import { RouteObject } from "react-router-dom"
import LoginPortal from "../components/LoginPortal"
import React from "react"
import { ProtectedRoute } from "./ProtectedRoute"
import ProblemList from "../components/ProblemList"


export const routes:RouteObject[]=[
  {
    path: '/login',
    element: <LoginPortal/>
  },
  {
    path:'/',
    element:(
      <ProtectedRoute>
        <ProblemList/>
      </ProtectedRoute>
    )
  }
]