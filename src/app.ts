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
import countryRouter from "./application/country/country.routes";
import businessUnitRouter from "./application/business-unit/business-unit.routes";
import schoolRouter from "./application/school/school.routes";
import campusRouter from "./application/campus/campus.routes";
import periodRouter from "./application/period/period.routes";
import careerRouter from "./application/career/career.routes";
import stateRouter from "./application/state/state.routes";
import cityRouter from "./application/city/city.routes";
import districtRouter from "./application/district/district.routes";
import contactRouter from "./application/contact/contact.routes";
import contactChannelRouter from "./application/contact-channel/contact-channel.routes";
import menuRouter from "./application/menu/menu.routes";
import trackingClassificationRouter from "./application/tracking-classification/tracking-classification.routes";
import trackingClassificationActionRouter from "./application/tracking-classification-action/tracking-classification-action.routes";
import salePhaseRouter from "./application/sale-phase/sale-phase.routes";
import opportunityRouter from "./application/opportunity/opportunity.routes";
import contactChannelDetailRouter from "./application/contact-channel-detail/contact-channel-detail.routes";

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
app.use("/api", menuRouter);
app.use("/api", degreeRouter);
app.use("/api", degreeSpecificationRouter);
app.use("/api", collegeRouter);
app.use("/api", languageRouter);
app.use("/api", nationalityRouter);
app.use("/api", ethnicityRouter);
app.use("/api", countryRouter);
app.use("/api", businessUnitRouter);
app.use("/api", schoolRouter);
app.use("/api", campusRouter);
app.use("/api", periodRouter);
app.use("/api", careerRouter);
app.use("/api", stateRouter);
app.use("/api", cityRouter);
app.use("/api", districtRouter);
app.use("/api", contactRouter);
app.use("/api", contactChannelRouter);
app.use("/api", contactChannelDetailRouter);
app.use("/api", trackingClassificationRouter);
app.use("/api", trackingClassificationActionRouter);
app.use("/api", salePhaseRouter);
app.use("/api", opportunityRouter);
app.use("/", (_req, res) => {
    res.status(200).json({message: "Welcome to the API"})
});