export type userInp = {
  nationalCard?: number | fileInp;
  uploadedAssets?: number | fileInp;
  taxi?: number | taxiInp;
};

export type userSchema = {
  _id?: string;
  first_name: string;
  last_name: string;
  father_name: string;
  mobile: string;
  gender: "Male" | "Female";
  birth_date?: Date;
  personnel_number: string;
  national_number: string;
  address: string;
  level: "Ghost" | "Driver" | "Manager";
  registration_step:
    | "personalInformation"
    | "vehicleInformation"
    | "taxiInformation"
    | "docsInformation"
    | "completed";
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  nationalCard?: {
    _id?: string;
    name: string;
    type: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
  };
  uploadedAssets: {
    _id?: string;
    name: string;
    type: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
  taxi: {
    _id?: string;
    taxiType:
      | "khati"
      | "gardeshi"
      | "forodgah"
      | "rahAhan"
      | "terminal"
      | "vije"
      | "telephoni";
    vehicleType: "van" | "savari";
    systemModel:
      | "samand"
      | "peugeot"
      | "peride"
      | "naron"
      | "hyundai"
      | "delica"
      | "saipa"
      | "toyota"
      | "ghazaal"
      | "poroton"
      | "pars khodro"
      | "folox"
      | "reno"
      | "bereliance jin b"
      | "istana"
      | "jac"
      | "peykan"
      | "kia"
      | "others";
    color:
      | "zardRoghani"
      | "zardKhorshidi"
      | "sabzFosfori"
      | "noghrei"
      | "zard"
      | "sefid"
      | "sabzMetalic"
      | "noghreiMetalik"
      | "sabz"
      | "sefidRoghani"
      | "sefidSadafi"
      | "meshkiRoghani"
      | "narenji"
      | "khakestari"
      | "ghermez"
      | "others";
    origin: string;
    destination: string;
    license_plate: {
      letter: string;
    };
    vin: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
export type fileInp = {
  uploader?: number | userInp;
  taxi?: number | taxiInp;
};

export type fileSchema = {
  _id?: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  uploader: {
    _id?: string;
    first_name: string;
    last_name: string;
    father_name: string;
    mobile: string;
    gender: "Male" | "Female";
    birth_date?: Date;
    personnel_number: string;
    national_number: string;
    address: string;
    level: "Ghost" | "Driver" | "Manager";
    registration_step:
      | "personalInformation"
      | "vehicleInformation"
      | "taxiInformation"
      | "docsInformation"
      | "completed";
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  taxi: {
    _id?: string;
    taxiType:
      | "khati"
      | "gardeshi"
      | "forodgah"
      | "rahAhan"
      | "terminal"
      | "vije"
      | "telephoni";
    vehicleType: "van" | "savari";
    systemModel:
      | "samand"
      | "peugeot"
      | "peride"
      | "naron"
      | "hyundai"
      | "delica"
      | "saipa"
      | "toyota"
      | "ghazaal"
      | "poroton"
      | "pars khodro"
      | "folox"
      | "reno"
      | "bereliance jin b"
      | "istana"
      | "jac"
      | "peykan"
      | "kia"
      | "others";
    color:
      | "zardRoghani"
      | "zardKhorshidi"
      | "sabzFosfori"
      | "noghrei"
      | "zard"
      | "sefid"
      | "sabzMetalic"
      | "noghreiMetalik"
      | "sabz"
      | "sefidRoghani"
      | "sefidSadafi"
      | "meshkiRoghani"
      | "narenji"
      | "khakestari"
      | "ghermez"
      | "others";
    origin: string;
    destination: string;
    license_plate: {
      letter: string;
    };
    vin: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
};
export type taxiInp = {
  owner?: number | userInp;
  carCard?: number | fileInp;
  taxiLicense?: number | fileInp;
};

export type taxiSchema = {
  _id?: string;
  taxiType:
    | "khati"
    | "gardeshi"
    | "forodgah"
    | "rahAhan"
    | "terminal"
    | "vije"
    | "telephoni";
  vehicleType: "van" | "savari";
  systemModel:
    | "samand"
    | "peugeot"
    | "peride"
    | "naron"
    | "hyundai"
    | "delica"
    | "saipa"
    | "toyota"
    | "ghazaal"
    | "poroton"
    | "pars khodro"
    | "folox"
    | "reno"
    | "bereliance jin b"
    | "istana"
    | "jac"
    | "peykan"
    | "kia"
    | "others";
  color:
    | "zardRoghani"
    | "zardKhorshidi"
    | "sabzFosfori"
    | "noghrei"
    | "zard"
    | "sefid"
    | "sabzMetalic"
    | "noghreiMetalik"
    | "sabz"
    | "sefidRoghani"
    | "sefidSadafi"
    | "meshkiRoghani"
    | "narenji"
    | "khakestari"
    | "ghermez"
    | "others";
  origin: string;
  destination: string;
  license_plate: {
    letter: string;
  };
  vin: string;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    _id?: string;
    first_name: string;
    last_name: string;
    father_name: string;
    mobile: string;
    gender: "Male" | "Female";
    birth_date?: Date;
    personnel_number: string;
    national_number: string;
    address: string;
    level: "Ghost" | "Driver" | "Manager";
    registration_step:
      | "personalInformation"
      | "vehicleInformation"
      | "taxiInformation"
      | "docsInformation"
      | "completed";
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  carCard?: {
    _id?: string;
    name: string;
    type: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
  };
  taxiLicense?: {
    _id?: string;
    name: string;
    type: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
  };
};
export type ReqType = {
  main: {
    user: {
      addUser: {
        set: {
          first_name: string;
          last_name: string;
          father_name: string;
          mobile: string;
          gender: "Male" | "Female";
          birth_date?: Date;
          personnel_number: string;
          national_number: string;
          address: string;
          level: "Ghost" | "Driver" | "Manager";
          registration_step:
            | "personalInformation"
            | "vehicleInformation"
            | "taxiInformation"
            | "docsInformation"
            | "completed";
          isVerified: boolean;
          createdAt: Date;
          updatedAt: Date;
        };
        get: {
          _id?: 0 | 1;
          first_name?: 0 | 1;
          last_name?: 0 | 1;
          father_name?: 0 | 1;
          mobile?: 0 | 1;
          gender?: 0 | 1;
          birth_date?: 0 | 1;
          personnel_number?: 0 | 1;
          national_number?: 0 | 1;
          address?: 0 | 1;
          level?: 0 | 1;
          registration_step?: 0 | 1;
          isVerified?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          nationalCard?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          uploadedAssets?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          taxi?: {
            _id?: 0 | 1;
            taxiType?: 0 | 1;
            vehicleType?: 0 | 1;
            systemModel?: 0 | 1;
            color?: 0 | 1;
            manufactureYears?: 0 | 1;
            origin?: 0 | 1;
            destination?: 0 | 1;
            license_plate?: 0 | 1;
            vin?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
        };
      };

      getMe: {
        set: {};
        get: {
          _id?: 0 | 1;
          first_name?: 0 | 1;
          last_name?: 0 | 1;
          father_name?: 0 | 1;
          mobile?: 0 | 1;
          gender?: 0 | 1;
          birth_date?: 0 | 1;
          personnel_number?: 0 | 1;
          national_number?: 0 | 1;
          address?: 0 | 1;
          level?: 0 | 1;
          registration_step?: 0 | 1;
          isVerified?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          nationalCard?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            uploader?: {
              _id?: 0 | 1;
              first_name?: 0 | 1;
              last_name?: 0 | 1;
              father_name?: 0 | 1;
              mobile?: 0 | 1;
              gender?: 0 | 1;
              birth_date?: 0 | 1;
              personnel_number?: 0 | 1;
              national_number?: 0 | 1;
              address?: 0 | 1;
              level?: 0 | 1;
              registration_step?: 0 | 1;
              isVerified?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxi?: {
              _id?: 0 | 1;
              taxiType?: 0 | 1;
              vehicleType?: 0 | 1;
              systemModel?: 0 | 1;
              color?: 0 | 1;
              manufactureYears?: 0 | 1;
              origin?: 0 | 1;
              destination?: 0 | 1;
              license_plate?: 0 | 1;
              vin?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
          uploadedAssets?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            uploader?: {
              _id?: 0 | 1;
              first_name?: 0 | 1;
              last_name?: 0 | 1;
              father_name?: 0 | 1;
              mobile?: 0 | 1;
              gender?: 0 | 1;
              birth_date?: 0 | 1;
              personnel_number?: 0 | 1;
              national_number?: 0 | 1;
              address?: 0 | 1;
              level?: 0 | 1;
              registration_step?: 0 | 1;
              isVerified?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxi?: {
              _id?: 0 | 1;
              taxiType?: 0 | 1;
              vehicleType?: 0 | 1;
              systemModel?: 0 | 1;
              color?: 0 | 1;
              manufactureYears?: 0 | 1;
              origin?: 0 | 1;
              destination?: 0 | 1;
              license_plate?: 0 | 1;
              vin?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
          taxi?: {
            _id?: 0 | 1;
            taxiType?: 0 | 1;
            vehicleType?: 0 | 1;
            systemModel?: 0 | 1;
            color?: 0 | 1;
            manufactureYears?: 0 | 1;
            origin?: 0 | 1;
            destination?: 0 | 1;
            license_plate?: 0 | 1;
            vin?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            owner?: {
              _id?: 0 | 1;
              first_name?: 0 | 1;
              last_name?: 0 | 1;
              father_name?: 0 | 1;
              mobile?: 0 | 1;
              gender?: 0 | 1;
              birth_date?: 0 | 1;
              personnel_number?: 0 | 1;
              national_number?: 0 | 1;
              address?: 0 | 1;
              level?: 0 | 1;
              registration_step?: 0 | 1;
              isVerified?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            carCard?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxiLicense?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
        };
      };

      getUser: {
        set: {
          _id: string;
        };
        get: {
          _id?: 0 | 1;
          first_name?: 0 | 1;
          last_name?: 0 | 1;
          father_name?: 0 | 1;
          mobile?: 0 | 1;
          gender?: 0 | 1;
          birth_date?: 0 | 1;
          personnel_number?: 0 | 1;
          national_number?: 0 | 1;
          address?: 0 | 1;
          level?: 0 | 1;
          registration_step?: 0 | 1;
          isVerified?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          nationalCard?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            uploader?: {
              _id?: 0 | 1;
              first_name?: 0 | 1;
              last_name?: 0 | 1;
              father_name?: 0 | 1;
              mobile?: 0 | 1;
              gender?: 0 | 1;
              birth_date?: 0 | 1;
              personnel_number?: 0 | 1;
              national_number?: 0 | 1;
              address?: 0 | 1;
              level?: 0 | 1;
              registration_step?: 0 | 1;
              isVerified?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxi?: {
              _id?: 0 | 1;
              taxiType?: 0 | 1;
              vehicleType?: 0 | 1;
              systemModel?: 0 | 1;
              color?: 0 | 1;
              manufactureYears?: 0 | 1;
              origin?: 0 | 1;
              destination?: 0 | 1;
              license_plate?: 0 | 1;
              vin?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
          uploadedAssets?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            uploader?: {
              _id?: 0 | 1;
              first_name?: 0 | 1;
              last_name?: 0 | 1;
              father_name?: 0 | 1;
              mobile?: 0 | 1;
              gender?: 0 | 1;
              birth_date?: 0 | 1;
              personnel_number?: 0 | 1;
              national_number?: 0 | 1;
              address?: 0 | 1;
              level?: 0 | 1;
              registration_step?: 0 | 1;
              isVerified?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxi?: {
              _id?: 0 | 1;
              taxiType?: 0 | 1;
              vehicleType?: 0 | 1;
              systemModel?: 0 | 1;
              color?: 0 | 1;
              manufactureYears?: 0 | 1;
              origin?: 0 | 1;
              destination?: 0 | 1;
              license_plate?: 0 | 1;
              vin?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
          taxi?: {
            _id?: 0 | 1;
            taxiType?: 0 | 1;
            vehicleType?: 0 | 1;
            systemModel?: 0 | 1;
            color?: 0 | 1;
            manufactureYears?: 0 | 1;
            origin?: 0 | 1;
            destination?: 0 | 1;
            license_plate?: 0 | 1;
            vin?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            owner?: {
              _id?: 0 | 1;
              first_name?: 0 | 1;
              last_name?: 0 | 1;
              father_name?: 0 | 1;
              mobile?: 0 | 1;
              gender?: 0 | 1;
              birth_date?: 0 | 1;
              personnel_number?: 0 | 1;
              national_number?: 0 | 1;
              address?: 0 | 1;
              level?: 0 | 1;
              registration_step?: 0 | 1;
              isVerified?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            carCard?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxiLicense?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
        };
      };

      login: {
        set: {
          national_number: string;
          code: string;
        };
        get?: {
          token?: 0 | 1;
          user: {
            _id?: 0 | 1;
            first_name?: 0 | 1;
            last_name?: 0 | 1;
            father_name?: 0 | 1;
            mobile?: 0 | 1;
            gender?: 0 | 1;
            birth_date?: 0 | 1;
            personnel_number?: 0 | 1;
            national_number?: 0 | 1;
            address?: 0 | 1;
            level?: 0 | 1;
            registration_step?: 0 | 1;
            isVerified?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            nationalCard?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            uploadedAssets?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxi?: {
              _id?: 0 | 1;
              taxiType?: 0 | 1;
              vehicleType?: 0 | 1;
              systemModel?: 0 | 1;
              color?: 0 | 1;
              manufactureYears?: 0 | 1;
              origin?: 0 | 1;
              destination?: 0 | 1;
              license_plate?: 0 | 1;
              vin?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
        };
      };

      loginReq: {
        set: {
          national_number: string;
        };
        get: {
          mobile: 1;
          national_number: 1;
        };
      };

      tempUser: {
        set: {
          first_name: string;
          last_name: string;
          father_name: string;
          mobile: string;
          national_number: string;
        };
        get: {
          _id?: 0 | 1;
          first_name?: 0 | 1;
          last_name?: 0 | 1;
          father_name?: 0 | 1;
          mobile?: 0 | 1;
          gender?: 0 | 1;
          birth_date?: 0 | 1;
          personnel_number?: 0 | 1;
          national_number?: 0 | 1;
          address?: 0 | 1;
          level?: 0 | 1;
          registration_step?: 0 | 1;
          isVerified?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          nationalCard?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          uploadedAssets?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          taxi?: {
            _id?: 0 | 1;
            taxiType?: 0 | 1;
            vehicleType?: 0 | 1;
            systemModel?: 0 | 1;
            color?: 0 | 1;
            manufactureYears?: 0 | 1;
            origin?: 0 | 1;
            destination?: 0 | 1;
            license_plate?: 0 | 1;
            vin?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
        };
      };

      updateUser: {
        set: {
          first_name: string;
          last_name: string;
          father_name: string;
          gender: "Male" | "Female";
          birth_date?: Date;
          personnel_number: string;
          address: string;
          registration_step:
            | "personalInformation"
            | "vehicleInformation"
            | "taxiInformation"
            | "docsInformation"
            | "completed";
          createdAt: Date;
          updatedAt: Date;
        };
        get: {
          _id?: 0 | 1;
          first_name?: 0 | 1;
          last_name?: 0 | 1;
          father_name?: 0 | 1;
          mobile?: 0 | 1;
          gender?: 0 | 1;
          birth_date?: 0 | 1;
          personnel_number?: 0 | 1;
          national_number?: 0 | 1;
          address?: 0 | 1;
          level?: 0 | 1;
          registration_step?: 0 | 1;
          isVerified?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          nationalCard?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          uploadedAssets?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          taxi?: {
            _id?: 0 | 1;
            taxiType?: 0 | 1;
            vehicleType?: 0 | 1;
            systemModel?: 0 | 1;
            color?: 0 | 1;
            manufactureYears?: 0 | 1;
            origin?: 0 | 1;
            destination?: 0 | 1;
            license_plate?: 0 | 1;
            vin?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
        };
      };

      registerUser: {
        set: {
          mobile: string;
          national_number: string;
        };
        get: {
          _id?: 0 | 1;
          first_name?: 0 | 1;
          last_name?: 0 | 1;
          father_name?: 0 | 1;
          mobile?: 0 | 1;
          gender?: 0 | 1;
          birth_date?: 0 | 1;
          personnel_number?: 0 | 1;
          national_number?: 0 | 1;
          address?: 0 | 1;
          level?: 0 | 1;
          registration_step?: 0 | 1;
          isVerified?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          nationalCard?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          uploadedAssets?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          taxi?: {
            _id?: 0 | 1;
            taxiType?: 0 | 1;
            vehicleType?: 0 | 1;
            systemModel?: 0 | 1;
            color?: 0 | 1;
            manufactureYears?: 0 | 1;
            origin?: 0 | 1;
            destination?: 0 | 1;
            license_plate?: 0 | 1;
            vin?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
        };
      };

      insertCSV: {
        set: {};
        get: {
          ok: 0 | 1;
        };
      };

      changeMobile: {
        set: {
          national_number: string;
          mobile: string;
        };
        get: {
          mobile: 1;
          national_number: 1;
        };
      };
    };

    taxi: {
      addTaxi: {
        set: {
          taxiType:
            | "khati"
            | "gardeshi"
            | "forodgah"
            | "rahAhan"
            | "terminal"
            | "vije"
            | "telephoni";
          vehicleType: "van" | "savari";
          systemModel:
            | "samand"
            | "peugeot"
            | "peride"
            | "naron"
            | "hyundai"
            | "delica"
            | "saipa"
            | "toyota"
            | "ghazaal"
            | "poroton"
            | "pars khodro"
            | "folox"
            | "reno"
            | "bereliance jin b"
            | "istana"
            | "jac"
            | "peykan"
            | "kia"
            | "others";
          color:
            | "zardRoghani"
            | "zardKhorshidi"
            | "sabzFosfori"
            | "noghrei"
            | "zard"
            | "sefid"
            | "sabzMetalic"
            | "noghreiMetalik"
            | "sabz"
            | "sefidRoghani"
            | "sefidSadafi"
            | "meshkiRoghani"
            | "narenji"
            | "khakestari"
            | "ghermez"
            | "others";
          origin: string;
          destination: string;
          license_plate: {
            letter: string;
          };
          vin: string;
          createdAt: Date;
          updatedAt: Date;
          carCard?: string;
          taxiLicense?: string;
        };
        get: {
          _id?: 0 | 1;
          taxiType?: 0 | 1;
          vehicleType?: 0 | 1;
          systemModel?: 0 | 1;
          color?: 0 | 1;
          manufactureYears?: 0 | 1;
          origin?: 0 | 1;
          destination?: 0 | 1;
          license_plate?: 0 | 1;
          vin?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          owner?: {
            _id?: 0 | 1;
            first_name?: 0 | 1;
            last_name?: 0 | 1;
            father_name?: 0 | 1;
            mobile?: 0 | 1;
            gender?: 0 | 1;
            birth_date?: 0 | 1;
            personnel_number?: 0 | 1;
            national_number?: 0 | 1;
            address?: 0 | 1;
            level?: 0 | 1;
            registration_step?: 0 | 1;
            isVerified?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          carCard?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          taxiLicense?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
        };
      };

      updateVehicle: {
        set: {
          vehicleType: "van" | "savari";
          systemModel:
            | "samand"
            | "peugeot"
            | "peride"
            | "naron"
            | "hyundai"
            | "delica"
            | "saipa"
            | "toyota"
            | "ghazaal"
            | "poroton"
            | "pars khodro"
            | "folox"
            | "reno"
            | "bereliance jin b"
            | "istana"
            | "jac"
            | "peykan"
            | "kia"
            | "others";
          color:
            | "zardRoghani"
            | "zardKhorshidi"
            | "sabzFosfori"
            | "noghrei"
            | "zard"
            | "sefid"
            | "sabzMetalic"
            | "noghreiMetalik"
            | "sabz"
            | "sefidRoghani"
            | "sefidSadafi"
            | "meshkiRoghani"
            | "narenji"
            | "khakestari"
            | "ghermez"
            | "others";
          license_plate: {
            letter: string;
          };
          vin: string;
        };
        get: {
          _id?: 0 | 1;
          taxiType?: 0 | 1;
          vehicleType?: 0 | 1;
          systemModel?: 0 | 1;
          color?: 0 | 1;
          manufactureYears?: 0 | 1;
          origin?: 0 | 1;
          destination?: 0 | 1;
          license_plate?: 0 | 1;
          vin?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          owner?: {
            _id?: 0 | 1;
            first_name?: 0 | 1;
            last_name?: 0 | 1;
            father_name?: 0 | 1;
            mobile?: 0 | 1;
            gender?: 0 | 1;
            birth_date?: 0 | 1;
            personnel_number?: 0 | 1;
            national_number?: 0 | 1;
            address?: 0 | 1;
            level?: 0 | 1;
            registration_step?: 0 | 1;
            isVerified?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          carCard?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          taxiLicense?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
        };
      };

      updateTaxi: {
        set: {
          taxiType:
            | "khati"
            | "gardeshi"
            | "forodgah"
            | "rahAhan"
            | "terminal"
            | "vije"
            | "telephoni";
          origin?: string;
          destination?: string;
        };
        get: {
          _id?: 0 | 1;
          taxiType?: 0 | 1;
          vehicleType?: 0 | 1;
          systemModel?: 0 | 1;
          color?: 0 | 1;
          manufactureYears?: 0 | 1;
          origin?: 0 | 1;
          destination?: 0 | 1;
          license_plate?: 0 | 1;
          vin?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          owner?: {
            _id?: 0 | 1;
            first_name?: 0 | 1;
            last_name?: 0 | 1;
            father_name?: 0 | 1;
            mobile?: 0 | 1;
            gender?: 0 | 1;
            birth_date?: 0 | 1;
            personnel_number?: 0 | 1;
            national_number?: 0 | 1;
            address?: 0 | 1;
            level?: 0 | 1;
            registration_step?: 0 | 1;
            isVerified?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          carCard?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          taxiLicense?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
        };
      };

      updateDocs: {
        set: {
          nationalCardId: string;
          carCardId: string;
          taxiLicenseId: string;
        };
        get: {
          taxi: {
            _id?: 0 | 1;
            taxiType?: 0 | 1;
            vehicleType?: 0 | 1;
            systemModel?: 0 | 1;
            color?: 0 | 1;
            manufactureYears?: 0 | 1;
            origin?: 0 | 1;
            destination?: 0 | 1;
            license_plate?: 0 | 1;
            vin?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            owner?: {
              _id?: 0 | 1;
              first_name?: 0 | 1;
              last_name?: 0 | 1;
              father_name?: 0 | 1;
              mobile?: 0 | 1;
              gender?: 0 | 1;
              birth_date?: 0 | 1;
              personnel_number?: 0 | 1;
              national_number?: 0 | 1;
              address?: 0 | 1;
              level?: 0 | 1;
              registration_step?: 0 | 1;
              isVerified?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            carCard?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxiLicense?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
          user: {
            _id?: 0 | 1;
            first_name?: 0 | 1;
            last_name?: 0 | 1;
            father_name?: 0 | 1;
            mobile?: 0 | 1;
            gender?: 0 | 1;
            birth_date?: 0 | 1;
            personnel_number?: 0 | 1;
            national_number?: 0 | 1;
            address?: 0 | 1;
            level?: 0 | 1;
            registration_step?: 0 | 1;
            isVerified?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            nationalCard?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            uploadedAssets?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxi?: {
              _id?: 0 | 1;
              taxiType?: 0 | 1;
              vehicleType?: 0 | 1;
              systemModel?: 0 | 1;
              color?: 0 | 1;
              manufactureYears?: 0 | 1;
              origin?: 0 | 1;
              destination?: 0 | 1;
              license_plate?: 0 | 1;
              vin?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
        };
      };

      updateFull: {
        set: {
          vehicleType?: "van" | "savari";
          systemModel?:
            | "samand"
            | "peugeot"
            | "peride"
            | "naron"
            | "hyundai"
            | "delica"
            | "saipa"
            | "toyota"
            | "ghazaal"
            | "poroton"
            | "pars khodro"
            | "folox"
            | "reno"
            | "bereliance jin b"
            | "istana"
            | "jac"
            | "peykan"
            | "kia"
            | "others";
          color?:
            | "zardRoghani"
            | "zardKhorshidi"
            | "sabzFosfori"
            | "noghrei"
            | "zard"
            | "sefid"
            | "sabzMetalic"
            | "noghreiMetalik"
            | "sabz"
            | "sefidRoghani"
            | "sefidSadafi"
            | "meshkiRoghani"
            | "narenji"
            | "khakestari"
            | "ghermez"
            | "others";
          license_plate?: {
            letter: string;
          };
          vin?: string;
          taxiType?:
            | "khati"
            | "gardeshi"
            | "forodgah"
            | "rahAhan"
            | "terminal"
            | "vije"
            | "telephoni";
          origin?: string;
          destination?: string;
        };
        get: {
          _id?: 0 | 1;
          taxiType?: 0 | 1;
          vehicleType?: 0 | 1;
          systemModel?: 0 | 1;
          color?: 0 | 1;
          manufactureYears?: 0 | 1;
          origin?: 0 | 1;
          destination?: 0 | 1;
          license_plate?: 0 | 1;
          vin?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          owner?: {
            _id?: 0 | 1;
            first_name?: 0 | 1;
            last_name?: 0 | 1;
            father_name?: 0 | 1;
            mobile?: 0 | 1;
            gender?: 0 | 1;
            birth_date?: 0 | 1;
            personnel_number?: 0 | 1;
            national_number?: 0 | 1;
            address?: 0 | 1;
            level?: 0 | 1;
            registration_step?: 0 | 1;
            isVerified?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          carCard?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          taxiLicense?: {
            _id?: 0 | 1;
            name?: 0 | 1;
            type?: 0 | 1;
            size?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
        };
      };
    };

    file: {
      getFiles: {
        set: {
          page: number;
          limit: number;
          name?: string;
          type?: "image" | "video";
        };
        get: {
          _id?: 0 | 1;
          name?: 0 | 1;
          type?: 0 | 1;
          size?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          uploader?: {
            _id?: 0 | 1;
            first_name?: 0 | 1;
            last_name?: 0 | 1;
            father_name?: 0 | 1;
            mobile?: 0 | 1;
            gender?: 0 | 1;
            birth_date?: 0 | 1;
            personnel_number?: 0 | 1;
            national_number?: 0 | 1;
            address?: 0 | 1;
            level?: 0 | 1;
            registration_step?: 0 | 1;
            isVerified?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            nationalCard?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            uploadedAssets?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxi?: {
              _id?: 0 | 1;
              taxiType?: 0 | 1;
              vehicleType?: 0 | 1;
              systemModel?: 0 | 1;
              color?: 0 | 1;
              manufactureYears?: 0 | 1;
              origin?: 0 | 1;
              destination?: 0 | 1;
              license_plate?: 0 | 1;
              vin?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
          taxi?: {
            _id?: 0 | 1;
            taxiType?: 0 | 1;
            vehicleType?: 0 | 1;
            systemModel?: 0 | 1;
            color?: 0 | 1;
            manufactureYears?: 0 | 1;
            origin?: 0 | 1;
            destination?: 0 | 1;
            license_plate?: 0 | 1;
            vin?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
            owner?: {
              _id?: 0 | 1;
              first_name?: 0 | 1;
              last_name?: 0 | 1;
              father_name?: 0 | 1;
              mobile?: 0 | 1;
              gender?: 0 | 1;
              birth_date?: 0 | 1;
              personnel_number?: 0 | 1;
              national_number?: 0 | 1;
              address?: 0 | 1;
              level?: 0 | 1;
              registration_step?: 0 | 1;
              isVerified?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            carCard?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
            taxiLicense?: {
              _id?: 0 | 1;
              name?: 0 | 1;
              type?: 0 | 1;
              size?: 0 | 1;
              createdAt?: 0 | 1;
              updatedAt?: 0 | 1;
            };
          };
        };
      };

      uploadImage: {
        set: {
          updatePlus?: "nationalCard" | "carCard" | "taxiLicense";
          createdAt: Date;
          updatedAt: Date;
        };
        get: {
          _id?: 0 | 1;
          name?: 0 | 1;
          type?: 0 | 1;
          size?: 0 | 1;
          createdAt?: 0 | 1;
          updatedAt?: 0 | 1;
          uploader?: {
            _id?: 0 | 1;
            first_name?: 0 | 1;
            last_name?: 0 | 1;
            father_name?: 0 | 1;
            mobile?: 0 | 1;
            gender?: 0 | 1;
            birth_date?: 0 | 1;
            personnel_number?: 0 | 1;
            national_number?: 0 | 1;
            address?: 0 | 1;
            level?: 0 | 1;
            registration_step?: 0 | 1;
            isVerified?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
          taxi?: {
            _id?: 0 | 1;
            taxiType?: 0 | 1;
            vehicleType?: 0 | 1;
            systemModel?: 0 | 1;
            color?: 0 | 1;
            manufactureYears?: 0 | 1;
            origin?: 0 | 1;
            destination?: 0 | 1;
            license_plate?: 0 | 1;
            vin?: 0 | 1;
            createdAt?: 0 | 1;
            updatedAt?: 0 | 1;
          };
        };
      };
    };
  };
};

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const lesanApi = ({
  URL,
  settings,
  baseHeaders,
}: {
  URL: string;
  settings?: Record<string, any>;
  baseHeaders?: Record<string, any>;
}) => {
  const setting = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...baseHeaders,
    },
    ...settings,
  };

  const setHeaders = (headers: Record<string, any>) => {
    setting.headers = {
      ...setting.headers,
      ...headers,
    };
  };

  const getSetting = () => setting;

  const send = async <
    TService extends keyof ReqType,
    TModel extends keyof ReqType[TService],
    TAct extends keyof ReqType[TService][TModel],
    TSet extends DeepPartial<ReqType[TService][TModel][TAct]["set"]>,
    TGet extends DeepPartial<ReqType[TService][TModel][TAct]["get"]>
  >(
    body: {
      service?: TService;
      model: TModel;
      act: TAct;
      details: {
        set: TSet;
        get: TGet;
      };
    },
    additionalHeaders?: Record<string, any>
  ) => {
    const req = await fetch(URL, {
      ...getSetting(),
      headers: {
        ...getSetting().headers,
        ...additionalHeaders,
        connection: "keep-alive",
      },
      body: JSON.stringify(body),
    });

    return await req.json();
  };

  return { send, setHeaders };
};
