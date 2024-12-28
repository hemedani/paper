
    export type userInp = {
      nationalCard?: number | fileInp
      uploadedAssets?: number | fileInp
registeredPublications?: number | publicationInp
registerArticles?: number | articleInp
    }


    export type userSchema = {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" );
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
registeredPublications: {
_id?: string;
title: string;
createdAt: Date;
updatedAt: Date;
}[];
registerArticles: {
_id?: string;
key: string;
articleType: ("journalArticle" | "book" );
authors: string[];
title: string;
abstract: string;
ISBN: string;
ISNN: string;
DOI: string;
URL: string;
page: string;
issue: number;
volume: number;
createdAt: Date;
updatedAt: Date;
}[];
};
;


    export type fileInp = {
      uploader?: number | userInp
      
    }


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
gender: ("Male" | "Female" );
birth_date?: Date;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" );
isVerified: boolean;
createdAt: Date;
updatedAt: Date;
};
};
;


    export type publicationInp = {
      registrar?: number | userInp
      articles?: number | articleInp
    }


    export type publicationSchema = {
_id?: string;
title: string;
createdAt: Date;
updatedAt: Date;
registrar: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" );
isVerified: boolean;
createdAt: Date;
updatedAt: Date;
};
articles: {
_id?: string;
key: string;
articleType: ("journalArticle" | "book" );
authors: string[];
title: string;
abstract: string;
ISBN: string;
ISNN: string;
DOI: string;
URL: string;
page: string;
issue: number;
volume: number;
createdAt: Date;
updatedAt: Date;
}[];
};
;


    export type tagInp = {
      registrar?: number | userInp
      articles?: number | articleInp
    }


    export type tagSchema = {
_id?: string;
name: string;
createdAt: Date;
updatedAt: Date;
registrar: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" );
isVerified: boolean;
createdAt: Date;
updatedAt: Date;
};
articles: {
_id?: string;
key: string;
articleType: ("journalArticle" | "book" );
authors: string[];
title: string;
abstract: string;
ISBN: string;
ISNN: string;
DOI: string;
URL: string;
page: string;
issue: number;
volume: number;
createdAt: Date;
updatedAt: Date;
}[];
};
;


    export type articleInp = {
      registrar?: number | userInp
publication?: number | publicationInp
tags?: number | tagInp
      
    }


    export type articleSchema = {
_id?: string;
key: string;
articleType: ("journalArticle" | "book" );
authors: string[];
title: string;
abstract: string;
ISBN: string;
ISNN: string;
DOI: string;
URL: string;
page: string;
issue: number;
volume: number;
createdAt: Date;
updatedAt: Date;
registrar: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" );
isVerified: boolean;
createdAt: Date;
updatedAt: Date;
};
publication?: {
_id?: string;
title: string;
createdAt: Date;
updatedAt: Date;
};
tags?: {
_id?: string;
name: string;
createdAt: Date;
updatedAt: Date;
}[];
};
;


    export type ReqType = {

  
        main: {

      
        user: {

      
            addUser: {
set: {
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" );
isVerified: boolean;
createdAt: Date;
updatedAt: Date;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};

          
            getMe: {
set: {
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
uploader?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
uploader?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            getUser: {
set: {
_id: string;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
uploader?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
uploader?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
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
token?: (0 | 1 );
user: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            loginReq: {
set: {
national_number: string;
};
get: {
mobile: (1 );
national_number: (1 );
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
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};

          
            updateUser: {
set: {
first_name: string;
last_name: string;
father_name: string;
gender: ("Male" | "Female" );
birth_date?: Date;
personnel_number: string;
address: string;
createdAt: Date;
updatedAt: Date;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};

          
            registerUser: {
set: {
mobile: string;
national_number: string;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};

          
            insertCSV: {
set: {
};
get: {
ok: (0 | 1 );
};
};

          
            changeMobile: {
set: {
national_number: string;
mobile: string;
};
get: {
mobile: (1 );
national_number: (1 );
};
};

          
            getUsers: {
set: {
levels?: ("Ghost" | "Manager" | "Editor" );
page: number;
limit: number;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
uploader?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
uploader?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            removeUser: {
set: {
_id: string;
};
get: {
success?: (0 | 1 );
};
};

          
            countUsers: {
set: {
levels?: ("Ghost" | "Manager" | "Editor" );
};
get: {
qty: (0 | 1 );
};
};

          
          }

        
        article: {

      
            addArticle: {
set: {
key: string;
articleType: ("journalArticle" | "book" );
authors: string[];
title: string;
abstract: string;
ISBN: string;
ISNN: string;
DOI: string;
URL: string;
page: string;
issue: number;
volume: number;
createdAt: Date;
updatedAt: Date;
publicationId: string;
tagIds: string[];
};
get: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};

          
            getArticle: {
set: {
_id: string;
};
get: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            getArticles: {
set: {
page: number;
limit: number;
search?: string;
articleType?: ("journalArticle" | "book" );
authors?: string;
title?: string;
abstract?: string;
ISBN?: string;
ISNN?: string;
DOI?: string;
pageCount?: string;
issue?: number;
volume?: number;
publicationYear?: number;
tags?: string;
publication?: string;
};
get: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            updateArticle: {
set: {
articleId: string;
key: string;
articleType: ("journalArticle" | "book" );
authors: string[];
title: string;
abstract: string;
ISBN: string;
ISNN: string;
DOI: string;
URL: string;
page: string;
issue: number;
volume: number;
createdAt: Date;
updatedAt: Date;
};
get: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};

          
          }

        
        file: {

      
            getFiles: {
set: {
page: number;
limit: number;
name?: string;
type?: ("image" | "video" );
};
get: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
uploader?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            uploadImage: {
set: {
updatePlus?: ("nationalCard" | "carCard" | "taxiLicense" );
createdAt: Date;
updatedAt: Date;
};
get: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
uploader?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};

          
          }

        
        publication: {

      
            addPublication: {
set: {
title: string;
createdAt: Date;
updatedAt: Date;
};
get: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};

          
            updatePublication: {
set: {
_id: string;
title: string;
};
get: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            getPublication: {
set: {
_id: string;
};
get: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            getPublications: {
set: {
page: number;
limit: number;
title?: string;
};
get: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            removePublication: {
set: {
_id: string;
};
get: {
success?: (0 | 1 );
};
};

          
            countPublications: {
set: {
title?: string;
};
get: {
qty?: (0 | 1 );
};
};

          
          }

        
        tag: {

      
            addTag: {
set: {
name: string;
createdAt: Date;
updatedAt: Date;
};
get: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};

          
            updateTag: {
set: {
_id: string;
name: string;
};
get: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            getTag: {
set: {
_id: string;
};
get: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            getTags: {
set: {
page: number;
limit: number;
name?: string;
};
get: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
uploadedAssets?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registeredPublications?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
registerArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
articles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
authors?: (0 | 1 );
title?: (0 | 1 );
abstract?: (0 | 1 );
ISBN?: (0 | 1 );
ISNN?: (0 | 1 );
DOI?: (0 | 1 );
URL?: (0 | 1 );
page?: (0 | 1 );
issue?: (0 | 1 );
volume?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
registrar?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
};
};

          
            removeTag: {
set: {
_id: string;
};
get: {
success?: (0 | 1 );
};
};

          
            countTags: {
set: {
name?: string;
};
get: {
qty?: (0 | 1 );
};
};

          
          }

        
        }

      
    };

  
export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export const lesanApi = (
	{ URL, settings, baseHeaders }: {
		URL: string;
		settings?: Record<string, any>;
		baseHeaders?: Record<string, any>;
	},
) => {
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
		TGet extends DeepPartial<ReqType[TService][TModel][TAct]["get"]>,
	>(body: {
		service?: TService;
		model: TModel;
		act: TAct;
		details: {
			set: TSet;
			get: TGet;
		};
	}, additionalHeaders?: Record<string, any>) => {
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

  