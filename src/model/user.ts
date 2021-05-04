export interface UserToken {
  accessToken: string
  expiry: number
  roles: string []
  tenantId: string
  userId: string
}