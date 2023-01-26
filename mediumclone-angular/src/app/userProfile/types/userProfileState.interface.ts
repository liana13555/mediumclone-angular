import {ProfileInterface} from 'src/app/shared/types/profile.interface'

export interface UserProfileStateInterface {
  data: ProfileInterface
  isLoading: boolean
  error: string | null
}
