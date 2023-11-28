import express, { Application } from "express";
import cors from "cors";
import { ACCEPTED_ORIGINS } from "../globals";
import userRouter from "./application/user/user.routes";
import roleRouter from "./application/role/role.routes";
import componentRouter from "./application/component/component.routes";
import pageRouter from "./application/page/page.routes";
import degreeRouter from "./application/degree/degree.routes";
import degreeSpecificationRouter from "./application/degree-specification/degree-specification.routes";
import collegeRouter from "./application/college/college.routes";
import languageRouter from "./application/language/language.routes";
import nationalityRouter from "./application/nationality/nationality.routes";
import ethnicityRouter from "./application/ethnicity/ethnicity.routes";

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
app.use("/api", componentRouter);
app.use("/api", pageRouter);
app.use("/api", degreeRouter);
app.use("/api", degreeSpecificationRouter);
app.use("/api", collegeRouter);
app.use("/api", languageRouter);
app.use("/api", nationalityRouter);
app.use("/api", ethnicityRouter);
app.use("/", (_req, res) => {
    res.status(200).json({message: "Welcome to the API"})
});