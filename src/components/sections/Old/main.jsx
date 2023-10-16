// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { GlobalStyles } from './components/styles/GlobalStyles'

// import { Root, ReactRouter, ReactQuery } from './routes'
// import { RROne, RRTwo } from './components/sections/ReactRouter'
// import { RQOne, RQTwo } from './components/sections/ReactQuery'

// import { SidebarCtxProvider } from './contexts/SidebarCtx'

// import Template from './components/sections/Template'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     children: [
//       {
//         path: ':category_name/:article_id',
//         element: <Template />,
//         children: [],
//       },
//       {
//         path: 'reactrouter',
//         element: <ReactRouter />,
//         children: [],
//       },
//       {
//         path: 'reactquery',
//         element: <ReactQuery />,
//         children: [],
//       },
//       {
//         path: 'reactrouter/1',
//         element: <RROne />,
//       },
//       {
//         path: 'reactrouter/2',
//         element: <RRTwo />,
//       },
//       {
//         path: 'reactquery/1',
//         element: <RQOne />,
//       },
//       {
//         path: 'reactquery/2',
//         element: <RQTwo />,
//       },
//     ],
//   },
// ])

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <SidebarCtxProvider>
//       <GlobalStyles />
//       <RouterProvider router={router} />
//     </SidebarCtxProvider>
//   </React.StrictMode>
// )
