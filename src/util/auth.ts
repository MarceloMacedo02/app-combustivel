import { getTokenData } from "./token_token";


export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN' | "ROLE_ADMINTEC" | "ROLE_ADMINFINANCEIRO" | "ROLE_ADMINESTOQUE";
export const roles = ['ROLE_OPERATOR', 'ROLE_ADMIN', "ROLE_ADMINTEC", "ROLE_ADMINFINANCEIRO", "ROLE_ADMINESTOQUE"];

/**
 * verificar se tem acesso a tela
 */
 export const isFinantialAdmin=():boolean=>{  
  return hasAnyRoles(["ROLE_ADMINFINANCEIRO",'ROLE_ADMIN']) ;
}
export const isTecnalAdmin=():boolean=>{  
  console.log('istec' +  hasAnyRoles(["ROLE_ADMINTEC",'ROLE_ADMIN']));
  
  return hasAnyRoles(["ROLE_ADMINTEC",'ROLE_ADMIN']) ;
}
export const isStokAdmin=():boolean=>{  
  return hasAnyRoles(["ROLE_ADMINESTOQUE",'ROLE_ADMIN']) ;
}
export const isAdmin=():boolean=>{  
  return hasAnyRoles(['ROLE_ADMIN']) ;
}

export const isAuthenticated = (): boolean => {
  let tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    for (var i = 0; i < roles.length; i++) {
      if (tokenData.authorities.includes(roles[i])) {
        return true;
      }
    }
    //return roles.some(role => tokenData.authorities.includes(role));
  }

  return false;
};


export const hasAutorizationRole = (roleLevelAccess: string[]): boolean => {
  let out = true;
  if (!Array.isArray(roleLevelAccess))    return false;
  for (var i = 0; i < roleLevelAccess.length; i++) {
    let el1 = roleLevelAccess[i].toLowerCase();
    var pos = roles.indexOf(el1.toUpperCase());
    if (pos === -1) {
      out = false;
    }

  }
  return out;
}