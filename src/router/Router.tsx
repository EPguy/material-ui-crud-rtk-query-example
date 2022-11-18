import DescriptionAlert from "../components/alert/DescriptionAlert/DescriptionAlert";
import PasswordDialog from "../components/dialog/PasswordDialog/PasswordDialog";
import React from "react";
import {createBrowserRouter, Outlet} from "react-router-dom";
import BoardListPage from "../pages/BoardListPage/BoardListPage";

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
                path: "/", element: <BoardListPage/>
            }]
        }
    ],
    { basename: "/" }
)



export default Router;