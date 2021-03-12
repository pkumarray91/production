import axios from 'axios';
const API_URL = 'http://140.238.84.255:8000';
export default class LoginService{
    // constructor(){}
    login(user){
        const url = `${API_URL}/sapasuser/api/auth/login/`;
        return axios.post(url,user);
    }
 forgetpassword(user){

    const url = `${API_URL}/sapasuser/api/password_reset/`;
        return axios.post(url,user);
      }

   resetpassword(user){

    const url = `${API_URL}/sapasuser/api/password_reset/confirm/`;
        return axios.post(url,user);

   };

    // Reseller //
    registerReseller(user){
          const url = `${API_URL}/sapasuser/Reseller/`;
        return axios.post(url,user);
    }

    displayReseller(){
        const url = `${API_URL}/sapasuser/Reseller/`;
        return axios.get(url);
    }

    updateReseller(data){
        const url = `${API_URL}/sapasuser/Reseller/${data.id}/`;
        return axios.put(url,data);

    }

    //company //
    registerCompany(user){
        const url = `${API_URL}/sapasuser/Company/`;
        return axios.post(url,user);
    }

     displayCompany(urldata){
        const url = `${API_URL}/sapasuser/displayCompany/${urldata}`;
        return axios.get(url);
     }

     updateCompany(data){
         const url = `${API_URL}/sapasuser/Company/${data.id}/`;
        return axios.put(url,data);
     }

    // company user//
    registerCompanyUser(user){
        const url = `${API_URL}/sapasuser/CompanyUserRegister/`;
        return axios.post(url,user);
    }

    displayCompanyUser(company_id){
        const url =  `${API_URL}/sapasuser/CompanyUser/${company_id}/`;
        return axios.get(url);
    }

    updateCompanyUser(data){
     const url =  `${API_URL}/sapasuser/CompanyUser/${data.id}/`;
        return axios.put(url,data);

    }

    // Reseller user//
     registerResellerUser(user){
          const url = `${API_URL}/sapasuser/ResellerUserRegister/`;
        return axios.post(url,user);
    }
    displayResellerUser(urldata){
          const url = `${API_URL}/sapasuser/ResellerUserRegister/${urldata}`;
        return axios.get(url);
    }
    updateResellerUser(data){
          const url = `${API_URL}/sapasuser/ResellerUserRegister/${data.id}/`;
        return axios.put(url,data);
    }

   // Device //
    registerDevice(data){
        const url =  `${API_URL}/sapasuser/DeviceRegister/`;
        return axios.post(url,data);
    }

    displayDevice(urldata){
         const url =  `${API_URL}/sapasuser/displayDevice/${urldata}`;
        return axios.get(url);
    }

    updateDevice(data){
         const url =  `${API_URL}/sapasuser/DeviceRegister/${data.device_id}/`;
        return axios.put(url,data);

    }

 // Company Vehicle //
    registerCompanyVehicle(tblvehicle){
        const url = `${API_URL}/sapasuser/CompanyVehicleRegister/`;
        return axios.post(url,tblvehicle);
        }

    displayVehicleData(company_id){
          const url = `${API_URL}/sapasuser/CompanyVehicleRegister/${company_id}/`;
        return axios.get(url);
    }
    updateCompanyVehicle(data){
          const url = `${API_URL}/sapasuser/CompanyVehicleRegister/${data.vehicle_id}/`;
        return axios.put(url,data);
    }


 // Allocate Device //
    allocateDevice(data){
         const url = `${API_URL}/sapasuser/allocateDevice/`;
        return axios.post(url,data);
    }

    displayAllocate(company_id){
     const url = `${API_URL}/sapasuser/allocateDevice/${company_id}/`;
    return axios.get(url);
}

  updateAllocate(data){
         const url = `${API_URL}/sapasuser/allocateDevice/${data.id}/`;
        return axios.put(url,data);
    }

// Deallocate //
    DeallocateDevice(data){
     const url = `${API_URL}/sapasuser/Deallocate/`;
    return axios.post(url,data);
}
    Deallocate(company_id){
      const url = `${API_URL}/sapasuser/Deallocate/${company_id}/`;
    return axios.get(url);
}

// vehicle //
    displayVehicle_number(company_id){
     const url = `${API_URL}/sapasuser/displayVehicle_number/${company_id}/`;
    return axios.get(url);
    }

    getVehicleDevice(vehicle_id){
     const url = `${API_URL}/sapasuser/vehicleAllocateDevice/${vehicle_id}/`;
     return axios.get(url);
    }

    audit(file){
     const url = `${API_URL}/sapasuser/upload/`;
    return axios.post(url,file);
    }

// Fuelcalibration//


   registerFuelCalibration(data){
      const url = `${API_URL}/sapasuser/registerFuelCalibration/`;
        return axios.post(url,data);
   }

   displayfuelcalibration(urldata){
      const url = `${API_URL}/sapasuser/dispalyFuelCalibration/${urldata}`;
        return axios.get(url);
   }

   registerFuelCalibrationData(data){
     const url = `${API_URL}/sapasuser/registerFuelCalibrationData/`;
     return axios.post(url,data);
    }
}

