import {RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";
import configurationService from "../../../app/uiConfiguration/control/ConfigurationService.ts";
import oidcService from "../../../app/auth/control/OidcService.ts";

const _endpointPath = (paths: string[]) => {
  return [configurationService.backendConfig.baseUri, ...paths].join('/')
}

const _fetchRulePoliciesByUrl: (endpoint: URL, token: string) => Promise<RulePolicy[] | Awaited<RulePolicy[]>> = async (endpoint: URL, token: string) => {
  const request: RequestInit = {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  const fetchResponse = await fetch(endpoint, request);
  if (fetchResponse.status === 200) {
    return (await fetchResponse.json()) as RulePolicy[]
  } else if (fetchResponse.status > 204) {
    return Promise.resolve([]);
  } else if (fetchResponse.status === 404) {
    throw new Error(JSON.stringify({
      code: "RN-NOT-FOUND",
      message: "Not found"
    }))
  }

  throw new Error(JSON.stringify(await fetchResponse.json()))
}

const _getRulePoliciesFactoryMethod: () => (token: string) => Promise<RulePolicy[]> = (): (token: string) => Promise<RulePolicy[]> => {
  return async (token: string): Promise<RulePolicy[]> => {
    const endpoint = _endpointPath(['rules'])
    return _fetchRulePoliciesByUrl(new URL(endpoint), token)
  }
}

export const getRulePolices: () => Promise<RulePolicy[]> = () => {
  return oidcService.withToken(_getRulePoliciesFactoryMethod())
}