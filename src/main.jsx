import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './components/styles/GlobalStyles'
import '../index.css'

import { Root, Template } from './routes'

import { SidebarCtxProvider } from './contexts/SidebarCtx'
import Test from './routes/Test'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: ':category_name/:article_id',
        element: <Template />,
        children: [],
      },
    ],
  },
  {
    path: '/test',
    element: <Test />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidebarCtxProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </SidebarCtxProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
