/* #region Interfaces */
export interface IRole {
  _id?: string;
  name: string;
  type: RoleType;
  modules: IRoleModule[];
}

export interface IRoleModule {
  _id?: string;
  name: string;
  label: string;
  type: string;
  icon: string;
  permissions: string[];
  options: IRoleModuleOption[];
}

export interface IRoleModuleOption {
  _id?: string;
  name: string;
  label: string;
  url: string;
  permissions: string[];
}

export interface IModule {
  _id?: string;
  name: string;
  label: string;
  type: string;
  icon: string;
  permissions: string[];
  permissionsCatalog: string[];
  options: IOption[];
  selected?: boolean;
  roleType?: RoleType;
}

export interface IOption {
  _id?: string;
  name: string;
  label: string;
  url: string;
  permissions: string[];
  permissionsCatalog: string[];
  selected?: boolean;
}
/* #endregion */

/* #region Enums */
export enum RoleType {
  ADMIN = 'admin',
}
/* #endregion */
