import FormRequest from '../Http/Request/FormRequest'
import Request from '../Http/Request/Request'
import Driver from './Drivers/Driver'
import JwtDriver from './Drivers/JwtDriver'
import SessionDriver from './Drivers/SessionDriver'

interface AuthProtocol {
  /**
   * Authorize on specified auth protocol
   */
  on(protocol: string): AuthRequest
};

interface AuthRequest {
  /**
   * Using current request.
   */
  using(request: FormRequest | Request): Auth
}

interface Auth {
  /**
   * Authorize for set duration with abilities.
   */
  for<T = any>(duration: string | number, abilities?: string[]): T
}

export default class Authorize {
  /**
   * User to authorize.
   */
  static user<T = User>(user: T): AuthProtocol

  /**
   * Authorize on specified auth protocol
   */
  on(protocol: string): AuthRequest

  /**
   * Using current request.
   */
  using(request: FormRequest | Request): Auth

  /**
   * Authorize for set duration with abilities.
   */
  for<T = any>(duration: string | number, abilities?: string[]): T

  private getDriver(): typeof Driver | Driver | JwtDriver | SessionDriver
}
