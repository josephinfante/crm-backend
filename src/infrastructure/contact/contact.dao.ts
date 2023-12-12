import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { CollegeModel, ContactModel, CountryModel, DegreeSpecificationModel, DistrictModel, EthnicityModel, NationalityModel, OpportunityModel } from "../../shared/models";
import { GetZipCode, ListCondition, UniqueID } from "../../shared/utils";
import { ContactError } from "../../shared/errors";
import { ContactPresenter, IContactResponse } from "../../interfaces/presenters/contact.presenter";
import { ICreateContact, IUpdateContact } from "../../domain/contact/contact.type";
import { CreateContactLanguage, DeleteLanguagesByContactId, FindLanguagesByContactId } from "../contact-language/contact-language.dao";
import { IContactLanguageResponse } from "../../interfaces/presenters/contact-language.presenter";
import { SUPER_ADMIN_ID } from "../../../globals";

class ContactDao {
    async create(access: IAccessPermission, contact: ICreateContact): Promise<IContactResponse> {
        try {
            let college;
            let degree_specification;
            let ethnicity;
            let nationality;
            let country;
            let district;
            const contact_languages = [];
            const zipcode = contact.address && await GetZipCode(contact.address);
            const new_contact = {
                id: UniqueID.generate(),
                first_name: contact.first_name ?? null,
                last_name_1: contact.last_name_1 ?? null,
                last_name_2: contact.last_name_2 ?? null,
                mobile_number: contact.mobile_number ?? null,
                phone_number: contact.phone_number ?? null,
                document_type: contact.document_type ?? null,
                document_number: contact.document_number ?? null,
                code: contact.code ?? null,
                email_1: contact.email_1 ?? null,
                email_2: contact.email_2 ?? null,
                civil_status: contact.civil_status ?? null,
                gender: contact.gender ?? null,
                graduation_date: contact.graduation_date ?? null,
                whatsapp_number: contact.whatsapp_number ?? null,
                facebook_id: contact.facebook_id ?? null,
                instagram_id: contact.instagram_id ?? null,
                zipcode: zipcode ?? null,
                address: contact.address ?? null,
                address_reference: contact.address_reference ?? null,
                accept_policies: contact.accept_policies ?? null,
                accept_marketing: contact.accept_marketing ?? null,
                college_id: contact.college_id ?? null,
                degree_specification_id: contact.degree_specification_id ?? null,
                ethnicity_id: contact.ethnicity_id ?? null,
                nationality_id: contact.nationality_id ?? null,
                country_id: contact.country_id ?? null,
                district_id: contact.district_id ?? null,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                user_id: access.user_id ?? SUPER_ADMIN_ID,
            }
            const [_contact, created] = await ContactModel.findOrCreate({
                    where: {
                        [Op.or]: [
                            { document_number: contact.document_number },
                            { email_1: contact.email_1 },
                        ]
                    },
                    defaults: new_contact,
                })
                .then(contact => contact)
                .catch(_error => {throw new ContactError("Ha ocurrido un error al crear el contacto.")});

            if (!created) {
                const updated_contact = await this.update(access, _contact.dataValues.id, contact as any);
                return updated_contact;
            }

            if (contact.languages && contact.languages?.length > 0) {
                for (const language of contact.languages) {
                    const response: IContactLanguageResponse = await CreateContactLanguage(access, {
                        native: language.native,
                        level: language.level,
                        read: language.read,
                        speak: language.speak,
                        listen: language.listen,
                        language_id: language.id,
                        contact_id: new_contact.id,
                    });
                    contact_languages.push(response);
                }
            }
            if (contact.college_id) {
                college = await CollegeModel.findByPk(contact.college_id)
                    .then(college => college)
                    .catch(_error => {throw new ContactError("Ha ocurrido un error al revisar la institución educativa.")});
                if (!college) throw new ContactError("La institución educativa no existe.");
            }
            if (contact.degree_specification_id) {
                degree_specification = await DegreeSpecificationModel.findByPk(contact.degree_specification_id)
                    .then(degree_specification => degree_specification)
                    .catch(_error => {throw new ContactError("Ha ocurrido un error al revisar la especificación del grado académico.")});
                if (!degree_specification) throw new ContactError("La especialidad no existe.");
            }
            if (contact.ethnicity_id) {
                ethnicity = await EthnicityModel.findByPk(contact.ethnicity_id)
                    .then(ethnicity => ethnicity)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar la etnia.") });
                if (!ethnicity) throw new ContactError("La etnia no existe.");
            }
            if (contact.nationality_id) {
                nationality = await NationalityModel.findByPk(contact.nationality_id)
                    .then(nationality => nationality)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar la nacionalidad.") });
                if(!nationality) throw new ContactError("La nacionalidad no existe.");
            }
            if (contact.country_id) {
                country = await CountryModel.findByPk(contact.country_id)
                    .then(country => country)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar el país.") });
                if (!country) throw new ContactError("El país no existe.");
            }
            if (contact.district_id) {
                district = await DistrictModel.findByPk(contact.district_id)
                    .then(district => district)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar el distrito.") });
                if (!district) throw new ContactError("El distrito no existe.");
            }

            return ContactPresenter(new_contact, access, contact_languages, college?.dataValues, degree_specification?.dataValues, ethnicity?.dataValues, nationality?.dataValues, country?.dataValues, district?.dataValues)
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactError(error.message);
            else throw new Error("Ha ocurrido un error al crear el contacto.");
        }
    }
    async update(access: IAccessPermission, id: string, contact: IUpdateContact): Promise<IContactResponse> {
        try {
            let college;
            let degree_specification;
            let ethnicity;
            let nationality;
            let country;
            let district;
            const contact_languages = [];
            const contact_exist = await ContactModel.findOne({
                    where: [
                        { id: id },
                        ...(access.super_admin === false ? [{ user_id: access.user_id }] : [])
                    ],
                    include: [
                        { model: CollegeModel },
                        { model: DegreeSpecificationModel },
                        { model: EthnicityModel },
                        { model: NationalityModel },
                        { model: CountryModel },
                        { model: DistrictModel },
                    ]
                })
                .then(contact => contact)
                .catch(_error => { throw new ContactError(_error.message??'Ha ocurrido un error al revisar el contacto.') });

            if (!contact_exist) throw new ContactError(`El contacto con ID ${id} no existe.`);

            const zipcode = (contact_exist.dataValues.address !== contact.address) && contact.address ? await GetZipCode(contact.address) : contact_exist.dataValues.zipcode;

            if (contact.languages && contact.languages?.length > 0) {
                await DeleteLanguagesByContactId(access, id);
                for (const language of contact.languages) {
                    const response: IContactLanguageResponse = await CreateContactLanguage(access, {
                        native: language.native,
                        level: language.level,
                        read: language.read,
                        speak: language.speak,
                        listen: language.listen,
                        language_id: language.id,
                        contact_id: contact_exist.dataValues.id,
                    });
                    contact_languages.push(response);
                }
            }

            college = contact.college_id && (contact.college_id !== contact_exist.dataValues.college?.dataValues.id) ?
                await CollegeModel.findByPk(contact.college_id)
                    .then(college => college)
                    .catch(_error => {throw new ContactError("Ha ocurrido un error al revisar la institución educativa.")}) :
                contact_exist.dataValues.college;

            if (!college) throw new ContactError("La institución educativa proporcionada no existe.");

            degree_specification = contact.degree_specification_id && (contact.degree_specification_id !== contact_exist.dataValues.degree_specification?.dataValues.id) ?
                await DegreeSpecificationModel.findByPk(contact.degree_specification_id)
                    .then(degree_specification => degree_specification)
                    .catch(_error => {throw new ContactError("Ha ocurrido un error al revisar la especificación del grado académico.")}) :
                contact_exist.dataValues.degree_specification;

            if (!degree_specification) throw new ContactError("La especialidad proporcionada no existe.");

            ethnicity = contact.ethnicity_id && (contact.ethnicity_id !== contact_exist.dataValues.ethnicity?.dataValues.id) ?
                await EthnicityModel.findByPk(contact.ethnicity_id)
                    .then(ethnicity => ethnicity)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar la etnia.") }) :
                contact_exist.dataValues.ethnicity;

            if (!ethnicity) throw new ContactError("La etnia proporcionada no existe.");

            nationality = contact.nationality_id && (contact.nationality_id !== contact_exist.dataValues.nationality?.dataValues.id) ?
                await NationalityModel.findByPk(contact.nationality_id)
                    .then(nationality => nationality)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar la nacionalidad.") }) :
                contact_exist.dataValues.nationality;

            if (!nationality) throw new ContactError("La nacionalidad proporcionada no existe.");

            country = contact.country_id && (contact.country_id !== contact_exist.dataValues.country?.dataValues.id) ?
                await CountryModel.findByPk(contact.country_id)
                    .then(country => country)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar el país.") }) :
                contact_exist.dataValues.country;

            if (!country) throw new ContactError("El país proporcionado no existe.");

            district = contact.district_id && (contact.district_id !== contact_exist.dataValues.district?.dataValues.id) ?
                await DistrictModel.findByPk(contact.district_id)
                    .then(district => district)
                    .catch((_error) => { throw new ContactError("Ha ocurrido un error al revisar el distrito.") }) :
                contact_exist.dataValues.district;

            if (!district) throw new ContactError("El distrito proporcionado no existe.");

            contact_exist.set({
                first_name: contact.first_name ?? contact_exist.dataValues.first_name,
                last_name_1: contact.last_name_1 ?? contact_exist.dataValues.last_name_1,
                last_name_2: contact.last_name_2 ?? contact_exist.dataValues.last_name_2,
                mobile_number: contact.mobile_number ?? contact_exist.dataValues.mobile_number,
                phone_number: contact.phone_number ?? contact_exist.dataValues.phone_number,
                document_type: contact.document_type ?? contact_exist.dataValues.document_type,
                code: contact.code ?? contact_exist.dataValues.code,
                email_2: contact.email_2 ?? contact_exist.dataValues.email_2,
                civil_status: contact.civil_status ?? contact_exist.dataValues.civil_status,
                gender: contact.gender ?? contact_exist.dataValues.gender,
                graduation_date: contact.graduation_date ?? contact_exist.dataValues.graduation_date,
                whatsapp_number: contact.whatsapp_number ?? contact_exist.dataValues.whatsapp_number,
                facebook_id: contact.facebook_id ?? contact_exist.dataValues.facebook_id,
                instagram_id: contact.instagram_id ?? contact_exist.dataValues.instagram_id,
                zipcode: zipcode,
                address: contact.address ?? contact_exist.dataValues.address,
                address_reference: contact.address_reference ?? contact_exist.dataValues.address_reference,
                accept_policies: contact.accept_policies ?? contact_exist.dataValues.accept_policies,
                accept_marketing: contact.accept_marketing ?? contact_exist.dataValues.accept_marketing,
                updatedAt: Date.now(),
                college_id: contact.college_id ?? contact_exist.dataValues.college_id,
                degree_specification_id: contact.degree_specification_id ?? contact_exist.dataValues.degree_specification_id,
                ethnicity_id: contact.ethnicity_id ?? contact_exist.dataValues.ethnicity_id,
                nationality_id: contact.nationality_id ?? contact_exist.dataValues.nationality_id,
                country_id: contact.country_id ?? contact_exist.dataValues.country_id,
                district_id: contact.district_id ?? contact_exist.dataValues.district_id,
            })
            const updated = await contact_exist.save()
                .then(contact => contact)
                .catch(_error => { throw new ContactError('Ha ocurrido un error al actualizar el contacto.') });
            
            return ContactPresenter(updated.dataValues, access, contact_languages, college?.dataValues, degree_specification?.dataValues, ethnicity?.dataValues, nationality?.dataValues, country?.dataValues, district?.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactError(error.message);
            else throw new Error('Ha ocurrido un error al actualizar el contacto.');
        }
    }
    async delete(access: IAccessPermission, id: string): Promise<string | void> {
        try {
            const contact_exist = access.super_admin === true ? 
                await ContactModel.findByPk(id)
                    .then(contact => contact)
                    .catch(_error => { throw new ContactError('Ha ocurrido un error al revisar el contacto.') }) :
                await ContactModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(contact => contact)
                    .catch(_error => { throw new ContactError('Ha ocurrido un error al revisar el contacto.') });
            if (!contact_exist) throw new ContactError(`El contacto con ID ${id} no existe.`);

            const opportunities_affected = await OpportunityModel.count({ where: { contact_id: id } })
                .then(count => count)
                .catch(_error => { throw new ContactError('Ha ocurrido un error al revisar las oportunidades afectadas.') });

            contact_exist.set({
                deleted: true,
                updatedAt: Date.now(),
            })

            await contact_exist.save().catch(_error => { throw new ContactError('Ha ocurrido un error al tratar de eliminar el contacto.') });
            return `El contacto ha sido eliminado. ${opportunities_affected > 0 ? `${opportunities_affected} oportunidades han sido afectadas.` : ''}`;
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactError(error.message);
            else throw new Error("Ha ocurrido un error al eliminar el contacto.");
        }
    }
    async findById(access: IAccessPermission, id: string): Promise<IContactResponse> {
        try {
            const contact_exist = await ContactModel.findOne({
                    where: [
                        { id: id },
                        ...(access.super_admin === false ? [{ user_id: access.user_id }] : [])
                    ],
                    include: [
                        { model: CollegeModel },
                        { model: DegreeSpecificationModel },
                        { model: EthnicityModel },
                        { model: NationalityModel },
                        { model: CountryModel },
                        { model: DistrictModel },
                    ]
                })
                .then(contact => contact)
                .catch(_error => { throw new ContactError('Ha ocurrido un error al revisar el contacto.') });

            if (!contact_exist) throw new ContactError(`El contacto con ID ${id} no existe.`);

            const languages = await FindLanguagesByContactId(id);
            
            return ContactPresenter(contact_exist.dataValues, access, languages, contact_exist.dataValues.college?.dataValues, contact_exist.dataValues.degree_specification?.dataValues, contact_exist.dataValues.ethnicity?.dataValues, contact_exist.dataValues.nationality?.dataValues, contact_exist.dataValues.country?.dataValues, contact_exist.dataValues.district?.dataValues);
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactError(error.message);
            else throw new Error('Ha ocurrido un error al obtener el contacto.');
        }
    }
    async findAll(access: IAccessPermission, page: number, value?: string): Promise<{ contacts: {}[], total_contacts: number, total_pages: number, current_page: number}> {
        try {
            let filterCondition: WhereOptions = {};
            if (value) {
                const valueCondition = {
                    [Op.or]: [
                        { first_name: { [Op.like]: `%${value}%` } },
                    ],
                };
    
                filterCondition = valueCondition;
            }
            const { count, rows } = access.super_admin === true ?
                await ContactModel.findAndCountAll({
                        where: {
                            ...filterCondition,
                        },
                        limit: 100,
                        offset: (page - 1) * 100
                    })
                    .then(contacts => contacts)
                    .catch(_error => { throw new ContactError('Ha ocurrido un error al obtener los contactos.') }) :
                await ContactModel.findAndCountAll({ 
                        where: [
                            { user_id: access.user_id },
                            ListCondition(access),
                            {...filterCondition},
                        ],
                        limit: 100,
                        offset: (page - 1) * 100
                    })
                    .then(contacts => contacts)
                    .catch(_error => { throw new ContactError('Ha ocurrido un error al obtener los contactos.') });
            return {
                contacts: rows.map(contact => contact.dataValues),
                total_contacts: count,
                total_pages: Math.ceil(count / 100),
                current_page: page,
            };
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactError(error.message);
            else throw new Error('Ha ocurrido un error al obtener los contactos.');
        }
    }
}

const contactDao = new ContactDao();
export default contactDao;