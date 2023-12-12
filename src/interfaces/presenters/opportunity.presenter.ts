import { IAccessPermission } from "../../domain/auth/access.type";
import { IBusinessUnit } from "../../domain/business-unit/business-unit.type";
import { ICampus } from "../../domain/campus/campus.type";
import { ICareer } from "../../domain/career/career.type";
import { ICollege } from "../../domain/college/college.type";
import { IcontactChannel } from "../../domain/contact-channel/contact-channel.type";
import { IContact } from "../../domain/contact/contact.type";
import { IOpportunity } from "../../domain/opportunity/opportunity.type";
import { IPeriod } from "../../domain/period/period.type";
import { ISalePhase } from "../../domain/sale-phase/sale-phase.type";

export interface IOpportunityResponse {
    id: string,
    reserved_enrollment: number,
    reserved_period: number,
    postulation_type: string,
    postulation_date: number,
    tentative_enrollment_date: number,
    termination_motive: number,
    migration_code: string,
    last_interaction: string,
    interest_level: number,
    registration_form_date: number,
    purpose_full_interaction: number,
    competitor?: {
        id: string,
        name: string,
    }
    contact?: {
        id: string,
        name: string,
    },
    career?: {
        id: string,
        name: string,
        code: string,
    },
    period?: {
        id: string,
        name: string,
    },
    campus?: {
        id: string,
        name: string,
    },
    business_unit?: {
        id: string,
        name: string,
    },
    sale_phase?: {
        id: string,
        name: string,
    },
    contact_channel?: {
        id: string,
        name: string,
    },
    user?: {
        id: string,
        name: string,
    }
    hidden: boolean,
    deleted?: boolean,
    updatedAt: number,
    createdAt: number,
}

export function OpportunityPresenter(opportunity: IOpportunity, access: IAccessPermission, competitor?: ICollege, contact?: IContact, career?: ICareer, period?: IPeriod, campus?: ICampus, business_unit?: IBusinessUnit, sale_phase?: ISalePhase, contact_channel?: IcontactChannel, user?: {id: string, name: string}): IOpportunityResponse {
    return {
        id: opportunity.id,
        reserved_enrollment: opportunity.reserved_enrollment,
        reserved_period: opportunity.reserved_period,
        postulation_type: opportunity.postulation_type,
        postulation_date: opportunity.postulation_date,
        tentative_enrollment_date: opportunity.tentative_enrollment_date,
        termination_motive: opportunity.termination_motive,
        migration_code: opportunity.migration_code,
        last_interaction: opportunity.last_interaction,
        interest_level: opportunity.interest_level,
        registration_form_date: opportunity.registration_form_date,
        purpose_full_interaction: opportunity.purpose_full_interaction,
        competitor: competitor && {
            id: competitor.id,
            name: competitor.name,
        },
        contact: contact && {
            id: contact.id,
            name: `${contact.first_name} ${contact.last_name_1}`,
        },
        career: career && {
            id: career.id,
            name: career.name,
            code: career.code,
        },
        period: period && {
            id: period.id,
            name: period.name,
        },
        campus: campus && {
            id: campus.id,
            name: campus.name,
        },
        business_unit: business_unit && {
            id: business_unit.id,
            name: business_unit.name,
        },
        sale_phase: sale_phase && {
            id: sale_phase.id,
            name: sale_phase.name,
        },
        contact_channel: contact_channel && {
            id: contact_channel.id,
            name: contact_channel.name,
        },
        user: user && {
            id: user.id,
            name: user.name,
        },
        hidden: opportunity.hidden,
        ...((access?.super_admin || access?.permission.read_deleted) && { deleted: opportunity.deleted }),
        updatedAt: opportunity.updatedAt,
        createdAt: opportunity.createdAt,
    }
}