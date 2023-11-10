import express, { Application } from "express";
import cors from "cors";
import { ACCEPTED_ORIGINS } from "../globals";
import { userRouter } from "./api/user/user.routes";
import { roleRouter } from "./api/role/role.routes";
import { pageRouter } from "./api/page/page.routes";
import { componentRouter } from "./api/component/component.routes";
import { permissionRouter } from "./api/permission/permission.routes";
import { businessUnitRouter } from "./api/business-unit/business-unit.routes";
import { schoolRouter } from "./api/school/school.routes";
import { careerRouter } from "./api/career/career.routes";
import { campusRouter } from "./api/campus/campus.routes";
import { semesterRouter } from "./api/semester/semester.routes";
import { contactRouter } from "./api/contact/contact.routes";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (ACCEPTED_ORIGINS.includes(origin)) {
            callback(null, true)
            return;
        };
        return callback(new Error('Not allowed by CORS'));
    }
}));
app.disable('x-powered-by');

app.use("/api", userRouter);
app.use("/api", roleRouter);
app.use("/api", pageRouter);
app.use("/api", componentRouter);
app.use("/api", permissionRouter);
app.use("/api", businessUnitRouter);
app.use("/api", schoolRouter);
app.use("/api", careerRouter);
app.use("/api", campusRouter);
app.use("/api", semesterRouter);
app.use("/api", contactRouter);
app.use("/", (_req, res) => {
    res.status(200).json({message: "Welcome to the API"})
});