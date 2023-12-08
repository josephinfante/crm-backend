import { Request, Response, Router } from "express";
import path from "path";
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
import connectRouter from "./application/connect/connect.routes";
import eventRouter from "./application/event/event.routes";
import fileRouter from "./application/file/file.routes";
import eventControlRouter from "./application/event-control/event-control.routes";

export const appRouter = Router();

appRouter.use("/api", userRouter);
appRouter.use("/api", roleRouter);
appRouter.use("/api", componentRouter);
appRouter.use("/api", pageRouter);
appRouter.use("/api", menuRouter);
appRouter.use("/api", degreeRouter);
appRouter.use("/api", degreeSpecificationRouter);
appRouter.use("/api", collegeRouter);
appRouter.use("/api", languageRouter);
appRouter.use("/api", nationalityRouter);
appRouter.use("/api", ethnicityRouter);
appRouter.use("/api", countryRouter);
appRouter.use("/api", businessUnitRouter);
appRouter.use("/api", schoolRouter);
appRouter.use("/api", campusRouter);
appRouter.use("/api", periodRouter);
appRouter.use("/api", careerRouter);
appRouter.use("/api", stateRouter);
appRouter.use("/api", cityRouter);
appRouter.use("/api", districtRouter);
appRouter.use("/api", contactRouter);
appRouter.use("/api", contactChannelRouter);
appRouter.use("/api", contactChannelDetailRouter);
appRouter.use("/api", trackingClassificationRouter);
appRouter.use("/api", trackingClassificationActionRouter);
appRouter.use("/api", salePhaseRouter);
appRouter.use("/api", opportunityRouter);
appRouter.use("/api", connectRouter);
appRouter.use("/api", eventRouter);
appRouter.use("/api", eventControlRouter);
appRouter.use("/api", fileRouter);
appRouter.get("/uploads/:file_directory_name/:file", async (req: Request, res: Response) => {
    try {
        res.setHeader('Content-Disposition', `attachment; filename=${req.params}`);
        res.sendFile(path.join(__dirname + '../../uploads/', `${req.params.file_directory_name}/${req.params.file}`));
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});
appRouter.get("/", (_req: Request, res: Response) => {
    res.status(200).json({message: "Welcome to the API"})
});

export default appRouter;