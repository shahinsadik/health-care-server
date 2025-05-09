import express from "express";
import { UserRoutes } from "../modules/User/user.routes";
import path from "path";
import { AdminRoutes } from "../modules/Admin/admin.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
