import authRoute from "./auth.route.js";

const route = (app) => {
    app.use("/api/auth", authRoute);
}

export default route;