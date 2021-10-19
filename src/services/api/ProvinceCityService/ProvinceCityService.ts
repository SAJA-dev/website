import { AxiosResponse } from 'axios';
import City from 'global/types/City';
import Province from 'global/types/Province';
import BaseService from '../BaseService';

class ProvinceCityService extends BaseService {
  private provinceUrl = process.env.REACT_APP_PROVINCE_URL ?? '';
  private cityUrl = process.env.REACT_APP_CITY_URL ?? '';

  async getAllProvinces() {
    let provinces: Province[] = [];

    try {
      const response: AxiosResponse<any> = await this.Api.get(
        this.provinceUrl,
        this.config
      );

      if (response.data) {
        response.data.forEach((element: Province) => {
          provinces.push(element);
        });
      }
    } catch (error: any) {
      this.handleError(error);
    }

    return provinces;
  }

  async createProvince(province: Province) {
    try {
      await this.Api.post(
        this.provinceUrl,
        { name: province.name },
        this.config
      );
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async editProvince(province: Province) {
    if (province.id === '') return;
    let newProvince = undefined;
    try {
      const response = await this.Api.put(
        this.provinceUrl,
        province,
        this.config
      );
      if (response.data) {
        newProvince = response.data as Province;
      }
    } catch (error: any) {
      this.handleError(error);
    }
    return newProvince;
  }

  async deleteProvince(id: string) {
    try {
      await this.Api.delete(`${this.provinceUrl}/${id}`, this.config);
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async getProvinceCities(provinceId: string) {
    let cities: City[] = [];

    try {
      const response: AxiosResponse<any> = await this.Api.get(
        this.provinceUrl,
        this.config
      );
      if (response.data) {
        if (response.data.cities) {
          cities = response.data.cities as City[];
        }
      }
    } catch (error: any) {
      this.handleError(error);
    }

    return cities;
  }

  async createCityInProvince(provinceId: string, city: City) {
    try {
      await this.Api.post(
        `${this.provinceUrl}${this.cityUrl}/${provinceId}`,
        { name: city.name },
        this.config
      );
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async editCityInProvince(provinceId: string, city: City) {
    if (provinceId === '' || city.id === '') return;

    let updatedCity = undefined;
    try {
      console.log('city service 0');
      const response = await this.Api.put(
        `${this.provinceUrl}${this.cityUrl}/${provinceId}`,
        city,
        this.config
      );
      console.log('city service 1');
      if (response.data) {
        console.log('city service 2');
        updatedCity = response.data as City;
      }
    } catch (error: any) {
      this.handleError(error);
    }

    return updatedCity;
  }

  async deleteCityInProvince(provinceId: string, city: City) {
    try {
      await this.Api.delete(
        `${this.provinceUrl}${this.cityUrl}/${provinceId}`,
        {
          ...this.config,
          data: {
            id: city.id,
            name: city.name,
          },
        }
      );
    } catch (error: any) {
      this.handleError(error);
    }
  }
}

export default ProvinceCityService;
