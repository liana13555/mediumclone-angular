import {Injectable} from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving to localStorage', error)
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch (error) {
      console.error('Error getting data from localStorage', error)
      return null
    }
  }

  constructor() {}
}
