import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';
import { ExtensionContext } from '@microsoft/sp-extension-base';

// Enum of types of link checker
export enum LinkCheckerType {
  AuthError,
  HttpError,
  HttpSuccess,
  HttpRedirect
}

// LinkCheckerStateProps
export interface LinkCheckerStateProps {
  message: string;
  code: number;
  url: string;
  type: LinkCheckerType;
  icon: string;
}

export class LinkcheckerLibrary {
  protected static _sp: SPHttpClient;
  protected _context: ExtensionContext;

  constructor(context: ExtensionContext) {
    this._context = context;
    LinkcheckerLibrary._sp = context.serviceScope.consume(SPHttpClient.serviceKey);
  }

  // Check accessibility of the given URL
  public static async checkAccessibility(url: string): Promise<LinkCheckerStateProps> {
    let response: SPHttpClientResponse;
    let result: LinkCheckerStateProps;
    try {
      response = await LinkcheckerLibrary._sp.get(url, SPHttpClient.configurations.v1);
      result = {
        message: response.statusText,
        code: response.status,
        url: url,
        type: LinkCheckerType.HttpSuccess,
        // icon is utf-8 encoded checkmark
        icon: "&#x2714;"
      };
    } catch (error) {
      if (error.status === 401) {
        result = {
          message: error.message,
          code: error.status,
          url: url,
          type: LinkCheckerType.AuthError,
          // icon is utf-8 encoded exclamation mark
          icon: "&#x2757;"
        };
      } else {
        result = {
          message: error.message,
          code: error.status,
          url: url,
          type: LinkCheckerType.HttpError,
          // icon is utf-8 encoded x mark
          icon: "&#x2718;"
        };
      }
    }
    return result;
  }
}