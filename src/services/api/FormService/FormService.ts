import { AxiosResponse } from 'axios';
import { EstateForm } from 'global/types/EstateForm';
import BaseService from '../BaseService';

class FormService extends BaseService {
  private formUrl = process.env.REACT_APP_FORM_URL ?? '';

  getForms = async () => {
    let forms: EstateForm[] = [];

    try {
      const response: AxiosResponse<any> = await this.Api.get(
        this.formUrl,
        this.config
      );
      if (response.data) {
        forms = response.data as EstateForm[];
      }
    } catch (error: any) {
      this.handleError(error);
    }

    return forms;
  };

  getForm = async () => {};

  createForm = async (form: EstateForm) => {
    try {
      await this.Api.post(this.formUrl, form, this.config);
    } catch (error: any) {
      this.handleError(error);
    }
  };

  updateForm = async (formId: string, form: EstateForm) => {
    try {
      await this.Api.put(`${this.formUrl}/${formId}`, form, this.config);
    } catch (error: any) {
      this.handleError(error);
    }
  };

  deleteForm = async (formId: string) => {
    try {
      await this.Api.delete(`${this.formUrl}/${formId}`, this.config);
    } catch (error: any) {
      this.handleError(error);
    }
  };
}

export default FormService;
