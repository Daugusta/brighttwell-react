import { Navigate, createBrowserRouter } from "react-router-dom";
import NotFound from "./views/NotFound";
import Login from "./views/Login";
import Formulas from "./views/Formulas";
import FormulaForm from "./views/FormulaForm";
import WasherForm from "./views/WasherForm";
import ChannelForm from "./views/ChannelForm";
import ProductForm from "./views/ProductForm";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Channels from "./views/Channels";
import Washers from "./views/Washers";
import RtView from "./views/RtView";
import RtViewForm from "./views/RtViewForm";
import Calibration from "./views/Calibration";
import Advanced from "./views/Advanced";
import Statistic from "./views/Statistic";
import UploadFile from "./views/UploadFile";

const routes = [
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/formulas" />
            },
            // {
            //     path: '/dashboard',
            //     element: <Dashboard />
            // },
            {
                path: '/formulas',
                element: <Formulas />
            },
            {
                path: '/formulas/new',
                element: <FormulaForm key="formulaCreate" />
            },
            {
                path: '/formulas/:uid',
                element: <FormulaForm key="formulaUpdate" />
            },
            {
                path: '/washers',
                element: <Washers />
            },
            {
                path: '/washers/new',
                element: <WasherForm key="washerCreate" />
            },
            {
                path: '/washers/:uid',
                element: <WasherForm key="washerUpdate" />
            },
            {
                path: '/channels',
                element: <Channels />
            },
            {
                path: '/channels/new',
                element: <ChannelForm key="channelCreate" />
            },
            {
                path: '/channels/:uid',
                element: <ChannelForm key="channelUpdate" />
            },
            {
                path: '/products/new',
                element: <ProductForm key="productCreate" />
            },
            {
                path: '/products/:uid',
                element: <ProductForm key="ProductUpdate" />
            },
            {
                path: '/calibration',
                element: <Calibration />
            },
            {
                path: '/advanced',
                element: <Advanced />
            },
            {
                path: '/statistic',
                element: <Statistic />
            },
            {
                path: '/rtview',
                element: <RtView />
            },
            {
                path: '/uploadfile',
                element: <UploadFile />
            },
            {
                path: '/rtview/:uid',
                element: <RtViewForm key="realTimeView" />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    },
];

const router = createBrowserRouter( routes );

export default router;