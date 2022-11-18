import DescriptionAlert from "../components/alert/DescriptionAlert/DescriptionAlert";
import PasswordDialog from "../components/dialog/PasswordDialog/PasswordDialog";
import React from "react";
import {createBrowserRouter, Outlet} from "react-router-dom";
import PostListPage from "../pages/PostListPage/PostListPage";
import PostAddEditPage from "../pages/PostAddEditPage/PostAddEditPage";

const Router = () => createBrowserRouter(
    [
        {
            path: "/",
            element: <>
                <DescriptionAlert/>
                <PasswordDialog/>
                <Outlet/>
            </>,
            children: [{
                index: true,
                path: "/", element: <PostListPage/>
            }, {
                path: "post", element: <Outlet/>, children: [
                    {
                        path: "add", element: <PostAddEditPage/>
                    },
                    {
                        path: "edit/:seq", element: <PostAddEditPage/>
                    }
                ]
            }]
        }
    ],
    { basename: "/" }
)



export default Router;