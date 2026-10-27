
/* eslint-disable */

  
    export type userInp = {
      avatar?: number | fileInp
nationalCard?: number | fileInp
favArticles?: number | articleInp
favBlogs?: number | blogInp
      uploadedAssets?: number | fileInp
registeredPublications?: number | publicationInp
    }


    export type userSchema = {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
avatar?: {
_id?: string;
name: string;
type: string;
size: number;
createdAt?: Date;
updatedAt?: Date;
};
nationalCard?: {
_id?: string;
name: string;
type: string;
size: number;
createdAt?: Date;
updatedAt?: Date;
};
favArticles?: {
_id?: string;
key: string;
articleType: ("journalArticle" | "book" );
publicationYear: number;
title: string;
abstract: string;
ISBN?: string;
ISNN?: string;
DOI?: string;
URL: string;
page?: string;
issue?: number;
volume?: number;
createdAt?: Date;
updatedAt?: Date;
}[];
favBlogs?: {
_id?: string;
title: string;
subtitle: string;
abstract: string;
content: string;
likes?: number;
isInSwipper?: boolean;
createdAt?: Date;
updatedAt?: Date;
}[];
uploadedAssets: {
_id?: string;
name: string;
type: string;
size: number;
createdAt?: Date;
updatedAt?: Date;
}[];
registeredPublications: {
_id?: string;
title: string;
createdAt?: Date;
updatedAt?: Date;
}[];
};
;


    export type publicationInp = {
      registrar?: number | userInp
      
    }


    export type publicationSchema = {
_id?: string;
title: string;
createdAt?: Date;
updatedAt?: Date;
registrar: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
};
};
;


    export type authorInp = {
      registrar?: number | userInp
      
    }


    export type authorSchema = {
_id?: string;
first_name: string;
last_name: string;
createdAt?: Date;
updatedAt?: Date;
registrar: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
};
};
;


    export type tagInp = {
      registrar?: number | userInp
      
    }


    export type tagSchema = {
_id?: string;
name: string;
createdAt?: Date;
updatedAt?: Date;
registrar: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
};
};
;


    export type keywordInp = {
      registrar?: number | userInp
      
    }


    export type keywordSchema = {
_id?: string;
name: string;
createdAt?: Date;
updatedAt?: Date;
registrar: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
};
};
;


    export type articleInp = {
      registrar?: number | userInp
avatar?: number | fileInp
doc?: number | fileInp
publication?: number | publicationInp
authors?: number | authorInp
tags?: number | tagInp
keywords?: number | keywordInp
      favByUsers?: number | userInp
    }


    export type articleSchema = {
_id?: string;
key: string;
articleType: ("journalArticle" | "book" );
publicationYear: number;
title: string;
abstract: string;
ISBN?: string;
ISNN?: string;
DOI?: string;
URL: string;
page?: string;
issue?: number;
volume?: number;
createdAt?: Date;
updatedAt?: Date;
registrar: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
};
avatar?: {
_id?: string;
name: string;
type: string;
size: number;
createdAt?: Date;
updatedAt?: Date;
};
doc?: {
_id?: string;
name: string;
type: string;
size: number;
createdAt?: Date;
updatedAt?: Date;
};
publication?: {
_id?: string;
title: string;
createdAt?: Date;
updatedAt?: Date;
};
authors?: {
_id?: string;
first_name: string;
last_name: string;
createdAt?: Date;
updatedAt?: Date;
}[];
tags?: {
_id?: string;
name: string;
createdAt?: Date;
updatedAt?: Date;
}[];
keywords?: {
_id?: string;
name: string;
createdAt?: Date;
updatedAt?: Date;
}[];
favByUsers: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
}[];
};
;


    export type categoryInp = {
      registrar?: number | userInp
      
    }


    export type categorySchema = {
_id?: string;
name: string;
createdAt?: Date;
updatedAt?: Date;
registrar: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
};
};
;


    export type blogInp = {
      author?: number | userInp
pic?: number | fileInp
categories?: number | categoryInp
      favByUsers?: number | userInp
    }


    export type blogSchema = {
_id?: string;
title: string;
subtitle: string;
abstract: string;
content: string;
likes?: number;
isInSwipper?: boolean;
createdAt?: Date;
updatedAt?: Date;
author: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
};
pic: {
_id?: string;
name: string;
type: string;
size: number;
createdAt?: Date;
updatedAt?: Date;
};
categories?: {
_id?: string;
name: string;
createdAt?: Date;
updatedAt?: Date;
}[];
favByUsers: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
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
createdAt?: Date;
updatedAt?: Date;
uploader: {
_id?: string;
first_name: string;
last_name: string;
father_name: string;
mobile: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
isVerified: boolean;
createdAt?: Date;
updatedAt?: Date;
};
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
summery?: string;
personnel_number: string;
national_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
createdAt?: Date;
updatedAt?: Date;
avatar?: string;
nationalCard?: string;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};

          
            checkSession: {
set: {
};
get: {
valid?: boolean;
code?: ("AUTH_TOKEN_MISSING" | "AUTH_TOKEN_INVALID" | "AUTH_TOKEN_EXPIRED" | "AUTH_USER_ID_INVALID" | "AUTH_USER_NOT_FOUND" );
message?: string;
user?: {
_id?: string;
level?: ("Ghost" | "Manager" | "Editor" | "Normal" );
};
expiresAt?: string;
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
doc?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
authors?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
keywords?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
author?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
pic?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
categories?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
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
summery?: (0 | 1 );
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
summery?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
doc?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
authors?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
keywords?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
author?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
pic?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
categories?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
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
summery?: (0 | 1 );
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
summery?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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

          
            refreshToken: {
set: {
};
get: {
token?: (0 | 1 );
expiresAt?: string;
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};

          
            updateUser: {
set: {
_id: string;
first_name: string;
last_name: string;
father_name: string;
gender: ("Male" | "Female" );
birth_date?: Date;
summery?: string;
personnel_number: string;
address: string;
level: ("Ghost" | "Manager" | "Editor" | "Normal" );
createdAt?: Date;
updatedAt?: Date;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
levels?: ("Ghost" | "Manager" | "Editor" | "Normal" );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
doc?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
authors?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
keywords?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
author?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
pic?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
categories?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
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
summery?: (0 | 1 );
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
summery?: (0 | 1 );
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
};

          
            removeUser: {
set: {
_id: string;
hardCascade?: boolean;
};
get: {
success?: (0 | 1 );
};
};

          
            countUsers: {
set: {
levels?: ("Ghost" | "Manager" | "Editor" | "Normal" );
};
get: {
qty: (0 | 1 );
};
};

          
            dashboardStatistic: {
set: {
};
get: {
users?: (0 | 1 );
tags?: (0 | 1 );
publications?: (0 | 1 );
articles?: (0 | 1 );
blogs?: (0 | 1 );
authors?: (0 | 1 );
keywords?: (0 | 1 );
categories?: (0 | 1 );
};
};

          
            toggleFavArticle: {
set: {
articleId: string;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};

          
            updateUserRelations: {
set: {
_id: string;
avatar?: string;
nationalCard?: string;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};

          
          }

        
        article: {

      
            addArticle: {
set: {
key: string;
articleType: ("journalArticle" | "book" );
publicationYear: number;
title: string;
abstract: string;
ISBN?: string;
ISNN?: string;
DOI?: string;
URL: string;
page?: string;
issue?: number;
volume?: number;
createdAt?: Date;
updatedAt?: Date;
publication: string;
avatar?: string;
doc?: string;
tags: string[];
keywords?: string[];
authors: string[];
};
get: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
doc?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
authors?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
keywords?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
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

          
            getArticle: {
set: {
_id: string;
};
get: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
avatar?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
doc?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
authors?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
keywords?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            getArticles: {
set: {
page: number;
limit: number;
search?: string;
articleType?: ("journalArticle" | "book" );
title?: string;
abstract?: string;
ISBN?: string;
ISNN?: string;
DOI?: string;
pageCount?: string;
issue?: number;
volume?: number;
publicationYear?: number;
tags?: string[];
tagIds?: string[];
keywords?: string[];
keywordIds?: string[];
authorFamily?: string;
authorIds?: string[];
publication?: string;
};
get: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
avatar?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
doc?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
authors?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
keywords?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            updateArticle: {
set: {
_id: string;
key: string;
articleType: ("journalArticle" | "book" );
publicationYear: number;
title: string;
abstract: string;
ISBN?: string;
ISNN?: string;
DOI?: string;
URL: string;
page?: string;
issue?: number;
volume?: number;
};
get: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
doc?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
authors?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
keywords?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
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

          
            countArticles: {
set: {
search?: string;
articleType?: ("journalArticle" | "book" );
title?: string;
abstract?: string;
ISBN?: string;
ISNN?: string;
DOI?: string;
pageCount?: string;
issue?: number;
volume?: number;
publicationYear?: number;
tags?: string[];
tagIds?: string[];
keywords?: string[];
keywordIds?: string[];
authorFamily?: string;
authorIds?: string[];
publication?: string;
};
get: {
qty?: (0 | 1 );
};
};

          
            removeArticle: {
set: {
_id: string;
hardCascade?: boolean;
};
get: {
success?: (0 | 1 );
};
};

          
            updateArticleRelations: {
set: {
_id: string;
avatar?: string;
doc?: string;
publication?: string;
tags?: string[];
keywords?: string[];
authors?: string[];
};
get: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
doc?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
publication?: {
_id?: (0 | 1 );
title?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
authors?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
tags?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
keywords?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
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

        
        blog: {

      
            add: {
set: {
title: string;
subtitle: string;
abstract: string;
content: string;
isInSwipper?: boolean;
createdAt?: Date;
updatedAt?: Date;
pic: string;
categories: string[];
};
get: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
author?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
pic?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
categories?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
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

          
            update: {
set: {
_id: string;
title?: string;
subtitle?: string;
abstract?: string;
content?: string;
isInSwipper?: boolean;
};
get: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
author?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
pic?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
categories?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
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

          
            get: {
set: {
_id: string;
};
get: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
author?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
pic?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
categories?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            gets: {
set: {
page: number;
limit: number;
search?: string;
isInSwipper?: boolean;
sortByLikes?: boolean;
categoryIds?: string[];
};
get: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
author?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
pic?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
categories?: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            remove: {
set: {
_id: string;
hardCascade?: boolean;
};
get: {
success?: (0 | 1 );
};
};

          
            count: {
set: {
search?: string;
isInSwipper?: boolean;
categoryIds?: string[];
};
get: {
qty?: (0 | 1 );
};
};

          
            toggleFav: {
set: {
blogId: string;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};

          
            updateRelation: {
set: {
_id: string;
pic?: string;
categories?: string[];
};
get: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
author?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
pic?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
categories?: {
_id?: (0 | 1 );
name?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favByUsers?: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
father_name?: (0 | 1 );
mobile?: (0 | 1 );
gender?: (0 | 1 );
birth_date?: (0 | 1 );
summery?: (0 | 1 );
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

        
        file: {

      
            getFiles: {
set: {
page: number;
limit: number;
name?: string;
type?: ("image" | "video" | "doc" );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            uploadFile: {
set: {
type: ("video" | "image" | "doc" );
createdAt?: Date;
updatedAt?: Date;
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
summery?: (0 | 1 );
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
createdAt?: Date;
updatedAt?: Date;
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
summery?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            removePublication: {
set: {
_id: string;
hardCascade?: boolean;
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
createdAt?: Date;
updatedAt?: Date;
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
summery?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            getTags: {
set: {
page: number;
limit: number;
name?: string;
tagIds?: string[];
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            removeTag: {
set: {
_id: string;
hardCascade?: boolean;
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

        
        author: {

      
            add: {
set: {
first_name: string;
last_name: string;
createdAt?: Date;
updatedAt?: Date;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
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
summery?: (0 | 1 );
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

          
            update: {
set: {
_id: string;
first_name?: string;
last_name?: string;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
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
summery?: (0 | 1 );
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

          
            get: {
set: {
_id: string;
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            gets: {
set: {
page: number;
limit: number;
first_name?: string;
last_name?: string;
authorIds?: string[];
};
get: {
_id?: (0 | 1 );
first_name?: (0 | 1 );
last_name?: (0 | 1 );
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            remove: {
set: {
_id: string;
hardCascade?: boolean;
};
get: {
success?: (0 | 1 );
};
};

          
            count: {
set: {
};
get: {
qty?: (0 | 1 );
};
};

          
          }

        
        keyword: {

      
            addKeyword: {
set: {
name: string;
createdAt?: Date;
updatedAt?: Date;
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
summery?: (0 | 1 );
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

          
            updateKeyword: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            getKeyword: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            getKeywords: {
set: {
page: number;
limit: number;
name?: string;
keywordIds?: string[];
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            removeKeyword: {
set: {
_id: string;
hardCascade?: boolean;
};
get: {
success?: (0 | 1 );
};
};

          
            countKeywords: {
set: {
name?: string;
};
get: {
qty?: (0 | 1 );
};
};

          
          }

        
        category: {

      
            add: {
set: {
name: string;
createdAt?: Date;
updatedAt?: Date;
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
summery?: (0 | 1 );
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

          
            update: {
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
summery?: (0 | 1 );
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

          
            get: {
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            gets: {
set: {
page: number;
limit: number;
name?: string;
categoryIds?: string[];
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
summery?: (0 | 1 );
personnel_number?: (0 | 1 );
national_number?: (0 | 1 );
address?: (0 | 1 );
level?: (0 | 1 );
isVerified?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
avatar?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
nationalCard?: {
_id?: (0 | 1 );
name?: (0 | 1 );
type?: (0 | 1 );
size?: (0 | 1 );
createdAt?: (0 | 1 );
updatedAt?: (0 | 1 );
};
favArticles?: {
_id?: (0 | 1 );
key?: (0 | 1 );
articleType?: (0 | 1 );
publicationYear?: (0 | 1 );
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
favBlogs?: {
_id?: (0 | 1 );
title?: (0 | 1 );
subtitle?: (0 | 1 );
abstract?: (0 | 1 );
content?: (0 | 1 );
likes?: (0 | 1 );
isInSwipper?: (0 | 1 );
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
};
};
};

          
            remove: {
set: {
_id: string;
hardCascade?: boolean;
};
get: {
success?: (0 | 1 );
};
};

          
            count: {
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
    // @ts-ignore: Unreachable code error
		TSet extends DeepPartial<ReqType[TService][TModel][TAct]["set"]>,
    // @ts-ignore: Unreachable code error
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

  