import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomeLayout, Landing, Register, Login, DashboardLayout, Error, Stats, AllJobs, AddJob, EditJob, Profile, Admin, DeleteJob } from './pages';

const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'dashboard',
                element: <DashboardLayout checkDefaultTheme={checkDefaultTheme} />,
                children: [
                    {
                        index: true,
                        element: <AddJob />,
                    },
                    {
                        path: 'stats',
                        element: <Stats />,
                    },
                    {
                        path: 'all-jobs',
                        element: <AllJobs />,
                    },
                    {
                        path: 'profile',
                        element: <Profile />,
                    },
                    {
                        path: 'admin',
                        element: <Admin />,
                    },
                    // {
                    //   path: "edit-job",
                    //   element: <EditJob />,
                    // },
                    // {
                    //   path: "add-job",
                    //   element: <AddJob />,
                    // },
                    // {
                    //   path: "delete-job",
                    //   element: <DeleteJob />,
                    // },
                ],
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;
