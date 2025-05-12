import authRoute from "./auth.route.js";
import messageRoute from "./message.route.js";

const route = (app) => {
    app.use("/api/auth", authRoute);
    app.use("/api/message", messageRoute);
}

export default route;