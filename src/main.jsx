import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GlobalStyles } from './components/styles/GlobalStyles'
import '../index.css'

import { Root, Template } from './routes'
import { sidebarLoader } from './routes/Root'
import { contentLoader } from './routes/Template'

import { SidebarCtxProvider } from './contexts/SidebarCtx'
import Test from './routes/Test'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ContextMenuCtxProvider } from './contexts/ContextMenuCtx'
import { EditCtxProvider } from './contexts/EditCtx'

import { ModalCtxProvider } from './contexts/ModalCtx'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: sidebarLoader(queryClient),
    children: [
      {
        path: ':category_name/:article_id/:article_name',
        element: <Template />,
        loader: contentLoader(queryClient),
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
      <EditCtxProvider>
        <ContextMenuCtxProvider>
          <SidebarCtxProvider>
            <ModalCtxProvider>
              <GlobalStyles />
              <RouterProvider router={router} />
            </ModalCtxProvider>
          </SidebarCtxProvider>
        </ContextMenuCtxProvider>
      </EditCtxProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
