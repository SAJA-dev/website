import EstateType from 'global/types/EstateType';
import BaseService from '../BaseService';

class EstateTypeService extends BaseService {
  private estateTypeUrl = process.env.REACT_APP_ESTATE_TYPE_URL ?? '';

  async getAllEstateTypes() {
    let estateTypes: EstateType[] = [];
    try {
      const response = await this.Api.get(this.estateTypeUrl, this.config);
      if (response.data) {
        response.data.forEach((element: EstateType) => {
          estateTypes.push(element);
        });
      }
    } catch (error: any) {
      this.handleError(error);
    }

    return estateTypes;
  }

  async createEstateType(estateType: EstateType) {
    try {
      await this.Api.post(
        this.estateTypeUrl,
        { name: estateType.name },
        this.config
      );
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async editEstateType(estateType: EstateType) {
    if (estateType.id === '') return;

    let type = undefined;

    try {
      const response = await this.Api.put(
        this.estateTypeUrl,
        estateType,
        this.config
      );

      if (response.data) {
        type = response.data as EstateType;
      }
    } catch (error: any) {
      this.handleError(error);
    }

    return type;
  }

  async deleteEstateType(id: string) {
    try {
      await this.Api.delete(`${this.estateTypeUrl}/${id}`, this.config);
    } catch (error: any) {
      this.handleError(error);
    }
  }
}

export default EstateTypeService;
