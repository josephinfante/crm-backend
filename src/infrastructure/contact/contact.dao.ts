import { Op, WhereOptions } from "sequelize";
import { IAccessPermission } from "../../domain/auth/access.type";
import { CollegeModel, ContactModel, CountryModel, DegreeSpecificationModel, DistrictModel, EthnicityModel, NationalityModel, OpportunityModel } from "../../shared/models";
import { GetZipCode, ListCondition, UniqueID } from "../../shared/utils";
import { CollegeError, ContactError, CountryError, DegreeSpecificationError, DistrictError, EthnicityError, NationalityError } from "../../shared/errors";
import { ContactPresenter, IContactResponse } from "../../interfaces/presenters/contact.presenter";
import { ICreateContact } from "../../domain/contact/contact.type";
import { CreateContactLanguage, DeleteLanguagesByContactId, FindLanguagesByContactId } from "../contact-language/contact-language.dao";
import { IContactLanguageResponse } from "../../interfaces/presenters/contact-language.presenter";
import { Contact } from "../../domain/contact/contact";

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
            const id = UniqueID.generate();
            const new_contact = {
                id: id,
                first_name: contact.first_name,
                last_name_1: contact.last_name_1,
                last_name_2: contact.last_name_2,
                mobile_number: contact.mobile_number,
                phone_number: contact.phone_number,
                document_type: contact.document_type,
                document_number: contact.document_number,
                code: contact.code,
                email_1: contact.email_1,
                email_2: contact.email_2,
                civil_status: contact.civil_status,
                gender: contact.gender,
                graduation_date: contact.graduation_date,
                whatsapp_number: contact.whatsapp_number,
                facebook_id: contact.facebook_id,
                instagram_id: contact.instagram_id,
                zipcode: zipcode,
                address: contact.address,
                address_reference: contact.address_reference,
                accept_policies: contact.accept_policies,
                accept_marketing: contact.accept_marketing,
                college_id: contact.college_id,
                degree_specification_id: contact.degree_specification_id,
                ethnicity_id: contact.ethnicity_id,
                nationality_id: contact.nationality_id,
                country_id: contact.country_id,
                district_id: contact.district_id,
                hidden: false,
                deleted: false,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                user_id: access.user_id,
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
            if (contact.languages) {
                for (const language of contact.languages) {
                    const response: IContactLanguageResponse = await CreateContactLanguage(access, {
                        native: language.native,
                        level: language.level,
                        read: language.read,
                        speak: language.speak,
                        listen: language.listen,
                        language_id: language.id,
                        contact_id: id,
                    });
                    contact_languages.push(response);
                }
            }
            if (contact.college_id) {
                college = await CollegeModel.findByPk(contact.college_id)
                    .then(college => college)
                    .catch(_error => {throw new CollegeError("Ha ocurrido un error al revisar la institución educativa.")});
                if (!college) throw new CollegeError("La institución educativa no existe.");
            }
            if (contact.degree_specification_id) {
                degree_specification = await DegreeSpecificationModel.findByPk(contact.degree_specification_id)
                    .then(degree_specification => degree_specification)
                    .catch(_error => {throw new DegreeSpecificationError("Ha ocurrido un error al revisar la especificación del grado académico.")});
                if (!degree_specification) throw new DegreeSpecificationError("La especialidad no existe.");
            }
            if (contact.ethnicity_id) {
                ethnicity = await EthnicityModel.findByPk(contact.ethnicity_id)
                    .then(ethnicity => ethnicity)
                    .catch((_error) => { throw new EthnicityError("Ha ocurrido un error al revisar la etnia.") });
                if (!ethnicity) throw new EthnicityError("La etnia no existe.");
            }
            if (contact.nationality_id) {
                nationality = await NationalityModel.findByPk(contact.nationality_id)
                    .then(nationality => nationality)
                    .catch((_error) => { throw new NationalityError("Ha ocurrido un error al revisar la nacionalidad.") });
                if(!nationality) throw new NationalityError("La nacionalidad no existe.");
            }
            if (contact.country_id) {
                country = await CountryModel.findByPk(contact.country_id)
                    .then(country => country)
                    .catch((_error) => { throw new CountryError("Ha ocurrido un error al revisar el país.") });
                if (!country) throw new CountryError("El país no existe.");
            }
            if (contact.district_id) {
                district = await DistrictModel.findByPk(contact.district_id)
                    .then(district => district)
                    .catch((_error) => { throw new DistrictError("Ha ocurrido un error al revisar el distrito.") });
                if (!district) throw new DistrictError("El distrito no existe.");
            }

            if (!created) {
                const updated_contact = await this.update(access, _contact.dataValues.id, contact as any);
                return updated_contact;
            }

            return ContactPresenter(new_contact, access, contact_languages, college?.dataValues, degree_specification?.dataValues, ethnicity?.dataValues, nationality?.dataValues, country?.dataValues, district?.dataValues)
        } catch (error) {
            if (error instanceof Error && error.message) throw new ContactError(error.message);
            else throw new Error("Ha ocurrido un error al crear el contacto.");
        }
    }
    async update(access: IAccessPermission, id: string, contact: Contact): Promise<IContactResponse> {
        try {
            let college;
            let degree_specification;
            let ethnicity;
            let nationality;
            let country;
            let district;
            const contact_exist = access.super_admin === true ? 
                await ContactModel.findByPk(id)
                    .then(contact => contact)
                    .catch(_error => { throw new ContactError('Ha ocurrido un error al revisar el contacto.') }) :
                await ContactModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(contact => contact)
                    .catch(_error => { throw new ContactError('Ha ocurrido un error al revisar el contacto.') });
            if (!contact_exist) throw new ContactError(`El contacto con ID ${id} no existe.`);

            const zipcode = (contact_exist.dataValues.address !== contact.address) && contact.address ? await GetZipCode(contact.address) : contact_exist.dataValues.zipcode;
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
                gender: contact.gender ?? contact_exist.dataValues.genre,
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
            await DeleteLanguagesByContactId(access, id);
            const languages = await FindLanguagesByContactId(id);
            if (contact.college_id) {
                college = await CollegeModel.findByPk(contact.college_id)
                    .then(college => college)
                    .catch(_error => {throw new CollegeError("Ha ocurrido un error al revisar la institución educativa.")});
                if (!college) throw new CollegeError("La institución educativa no existe.");
            }
            if (contact.degree_specification_id) {
                degree_specification = await DegreeSpecificationModel.findByPk(contact.degree_specification_id)
                    .then(degree_specification => degree_specification)
                    .catch(_error => {throw new DegreeSpecificationError("Ha ocurrido un error al revisar la especificación del grado académico.")});
                if (!degree_specification) throw new DegreeSpecificationError("La especialidad no existe.");
            }
            if (contact.ethnicity_id) {
                ethnicity = await EthnicityModel.findByPk(contact.ethnicity_id)
                    .then(ethnicity => ethnicity)
                    .catch((_error) => { throw new EthnicityError("Ha ocurrido un error al revisar la etnia.") });
                if (!ethnicity) throw new EthnicityError("La etnia no existe.");
            }
            if (contact.nationality_id) {
                nationality = await NationalityModel.findByPk(contact.nationality_id)
                    .then(nationality => nationality)
                    .catch((_error) => { throw new NationalityError("Ha ocurrido un error al revisar la nacionalidad.") });
                if(!nationality) throw new NationalityError("La nacionalidad no existe.");
            }
            if (contact.country_id) {
                country = await CountryModel.findByPk(contact.country_id)
                    .then(country => country)
                    .catch((_error) => { throw new CountryError("Ha ocurrido un error al revisar el país.") });
                if (!country) throw new CountryError("El país no existe.");
            }
            if (contact.district_id) {
                district = await DistrictModel.findByPk(contact.district_id)
                    .then(district => district)
                    .catch((_error) => { throw new DistrictError("Ha ocurrido un error al revisar el distrito.") });
                if (!district) throw new DistrictError("El distrito no existe.");
            }
            return ContactPresenter(updated.dataValues, access, languages, college?.dataValues, degree_specification?.dataValues, ethnicity?.dataValues, nationality?.dataValues, country?.dataValues, district?.dataValues);
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
            let college;
            let degree_specification;
            let ethnicity;
            let nationality;
            let country;
            let district;
            const contact_exist = access.super_admin === true ? 
                await ContactModel.findByPk(id)
                    .then(contact => contact)
                    .catch(_error => { throw new ContactError('Ha ocurrido un error al revisar el contacto.') }) :
                await ContactModel.findOne({ where: { id: id, user_id: access.user_id } })
                    .then(contact => contact)
                    .catch(_error => { throw new ContactError('Ha ocurrido un error al revisar el contacto.') });
            if (!contact_exist) throw new ContactError(`El contacto con ID ${id} no existe.`);

            const languages = await FindLanguagesByContactId(id);
            if (contact_exist.dataValues.college_id) {
                college = await CollegeModel.findByPk(contact_exist.dataValues.college_id)
                    .then(college => college)
                    .catch(_error => {throw new CollegeError("Ha ocurrido un error al revisar la institución educativa.")});
                if (!college) throw new CollegeError("La institución educativa no existe.");
            }
            if (contact_exist.dataValues.degree_specification_id) {
                degree_specification = await DegreeSpecificationModel.findByPk(contact_exist.dataValues.degree_specification_id)
                    .then(degree_specification => degree_specification)
                    .catch(_error => {throw new DegreeSpecificationError("Ha ocurrido un error al revisar la especificación del grado académico.")});
                if (!degree_specification) throw new DegreeSpecificationError("La especialidad no existe.");
            }
            if (contact_exist.dataValues.ethnicity_id) {
                ethnicity = await EthnicityModel.findByPk(contact_exist.dataValues.ethnicity_id)
                    .then(ethnicity => ethnicity)
                    .catch((_error) => { throw new EthnicityError("Ha ocurrido un error al revisar la etnia.") });
                if (!ethnicity) throw new EthnicityError("La etnia no existe.");
            }
            if (contact_exist.dataValues.nationality_id) {
                nationality = await NationalityModel.findByPk(contact_exist.dataValues.nationality_id)
                    .then(nationality => nationality)
                    .catch((_error) => { throw new NationalityError("Ha ocurrido un error al revisar la nacionalidad.") });
                if(!nationality) throw new NationalityError("La nacionalidad no existe.");
            }
            if (contact_exist.dataValues.country_id) {
                country = await CountryModel.findByPk(contact_exist.dataValues.country_id)
                    .then(country => country)
                    .catch((_error) => { throw new CountryError("Ha ocurrido un error al revisar el país.") });
                if (!country) throw new CountryError("El país no existe.");
            }
            if (contact_exist.dataValues.district_id) {
                district = await DistrictModel.findByPk(contact_exist.dataValues.district_id)
                    .then(district => district)
                    .catch((_error) => { throw new DistrictError("Ha ocurrido un error al revisar el distrito.") });
                if (!district) throw new DistrictError("El distrito no existe.");
            }
            return ContactPresenter(contact_exist.dataValues, access, languages, college?.dataValues, degree_specification?.dataValues, ethnicity?.dataValues, nationality?.dataValues, country?.dataValues, district?.dataValues);
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