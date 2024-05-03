import {createRulePolicy, RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";
import configurationService from "../../../app/uiConfiguration/control/ConfigurationService.ts";
import oidcService from "../../../app/auth/control/OidcService.ts";
import {Cluster} from "../../rulePolicy/entity/Clusters.ts";

const _endpointPath = (paths: string[]) => {
  return [configurationService.backendConfig.baseUri, ...paths].join('/')
}

const _fetchGetUrl = async (endpoint: URL, token: string): Promise<Response> => {
  const request: RequestInit = {
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    }
  };

  return fetch(endpoint, request);
};

const _fetchRulePolicyByUrl: (endpoint: URL, token: string) => Promise<RulePolicy | Awaited<RulePolicy>> = async (endpoint: URL, token: string) => {
  const fetchResponse = await _fetchGetUrl(endpoint, token);

  if (fetchResponse.status === 200) {
    return (await fetchResponse.json()) as RulePolicy
  } else if (fetchResponse.status > 200 && fetchResponse.status < 300) {
    return Promise.resolve(createRulePolicy(undefined, undefined, undefined, 'DE_ACTIVE'));
  } else if (fetchResponse.status === 404) {
    throw new Error(JSON.stringify({
      code: "RN-NOT-FOUND",
      message: "Not found"
    }))
  }

  throw new Error(JSON.stringify(await fetchResponse.json()))
}

const _createPolicyFactoryMethod: (rulePolicy: RulePolicy) => (token: string) => Promise<RulePolicy> = (rulePolicy: RulePolicy): (token: string) => Promise<RulePolicy> => {
  return async (token: string): Promise<RulePolicy> => {
    const endpoint = _endpointPath(['rules'])
    const request: RequestInit = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(rulePolicy)
    };

    const response = await fetch(endpoint, request);

    if (response.status === 201 && response.headers.get('Location') !== null) {
      return _fetchRulePolicyByUrl(new URL(response.headers.get('Location')!), token)
    } else {
      throw new Error(JSON.stringify(await response.json()))
    }
  }
}

export const apiCreateRulePolicy = (rulePolicy: RulePolicy) => {
  return oidcService.withToken(_createPolicyFactoryMethod(rulePolicy))
}


const _updatePolicyFactoryMethod: (rulePolicy: RulePolicy) => (token: string) => Promise<RulePolicy> = (rulePolicy: RulePolicy): (token: string) => Promise<RulePolicy> => {
  return async (token: string): Promise<RulePolicy> => {
    const endpoint = _endpointPath(['rule', rulePolicy.id])
    const request: RequestInit = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(rulePolicy)
    };

    const response = await fetch(endpoint, request);

    if (response.status === 200) {
      return _fetchRulePolicyByUrl(new URL(endpoint), token)
    } else {
      throw new Error(JSON.stringify(await response.json()))
    }
  }
}

export const apiUpdateRulePolicy = (rulePolicy: RulePolicy) => {
  return oidcService.withToken(_updatePolicyFactoryMethod(rulePolicy))
}


const _fetchPolicyFactoryMethod: (rulePolicyId: string) => (token: string) => Promise<RulePolicy> = (rulePolicyId: string): (token: string) => Promise<RulePolicy> => {
  return async (token: string): Promise<RulePolicy> => {
    const endpoint = _endpointPath(['rule', rulePolicyId])
    return _fetchRulePolicyByUrl(new URL(endpoint), token)
  }
}

export const apiGetRulePolicy = (rulePolicyId: string) => {
  return oidcService.withToken(_fetchPolicyFactoryMethod(rulePolicyId))
}

export const apiGetClusters = async (): Promise<Cluster[]> => {
  return oidcService.withToken(async (token: string): Promise<Cluster[]> => {
    const endpoint = _endpointPath(['clusters']);
    const response = await _fetchGetUrl(new URL(endpoint), token);
    if (response.status === 200) {
      return (await response.json()) as Cluster[];
    } else {
      throw new Error(JSON.stringify(await response.json()));
    }
  });
}